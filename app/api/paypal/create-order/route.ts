import { NextResponse } from "next/server"
import { randomUUID } from "node:crypto"
import { redisCommand } from "@/lib/server/redis"

export const runtime = "nodejs"

const PAYPAL_API = "https://api-m.paypal.com"

type PayPalLink = {
  rel: string
  href: string
}

type SajuInput = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  gender: "male" | "female"
}

function validSajuInput(value: unknown): value is SajuInput {
  if (!value || typeof value !== "object") {
    return false
  }

  const input = value as Record<string, unknown>

  const { year, month, day, hour, minute, gender } = input

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    !Number.isInteger(hour) ||
    !Number.isInteger(minute)
  ) {
    return false
  }

  const y = year as number
  const m = month as number
  const d = day as number
  const h = hour as number
  const min = minute as number

  if (
    y < 1900 ||
    y > 2100 ||
    m < 1 ||
    m > 12 ||
    h < 0 ||
    h > 23 ||
    min < 0 ||
    min > 59
  ) {
    return false
  }

  const date = new Date(Date.UTC(y, m - 1, d))

  if (
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== m - 1 ||
    date.getUTCDate() !== d
  ) {
    return false
  }

  return gender === "male" || gender === "female"
}

export async function POST(req: Request) {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !secret) {
    return NextResponse.json(
      { error: "PayPal not configured" },
      { status: 503 }
    )
  }

  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    )
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }

  const requestData = body as Record<string, unknown>

  if (
    requestData.plan !== "bronze" ||
    !validSajuInput(requestData.sajuInput)
  ) {
    return NextResponse.json(
      { error: "Invalid Bronze order or saju input" },
      { status: 400 }
    )
  }

  const sajuInput = requestData.sajuInput

  try {
    const auth = Buffer.from(
      `${clientId}:${secret}`
    ).toString("base64")

    const tokenResponse = await fetch(
      `${PAYPAL_API}/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials",
        cache: "no-store"
      }
    )

    if (!tokenResponse.ok) {
      throw new Error("PayPal authentication failed")
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    if (!accessToken) {
      throw new Error("PayPal access token missing")
    }

    const sessionId = randomUUID()

    const orderResponse = await fetch(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "PayPal-Request-Id": sessionId
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              custom_id: sessionId,
              description: "kupfate Bronze Personal Report",
              amount: {
                currency_code: "USD",
                value: "5.00"
              }
            }
          ],
          payment_source: {
            paypal: {
              experience_context: {
                return_url:
                  "https://www.kupfate.com/success",
                cancel_url:
                  "https://www.kupfate.com/",
                user_action: "PAY_NOW"
              }
            }
          }
        }),
        cache: "no-store"
      }
    )

    const order = await orderResponse.json()

    if (!orderResponse.ok || !order.id) {
      console.error("PayPal order creation failed", {
        status: orderResponse.status,
        name: order.name
      })

      throw new Error("PayPal order creation failed")
    }

    const approvalUrl = (
      order.links as PayPalLink[] | undefined
    )?.find(
      (link) =>
        link.rel === "payer-action" ||
        link.rel === "approve"
    )?.href

    if (!approvalUrl) {
      throw new Error("PayPal approval URL missing")
    }

    const parsedUrl = new URL(approvalUrl)

    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.hostname !== "www.paypal.com"
    ) {
      throw new Error("Invalid PayPal approval URL")
    }

    const orderData = {
      sessionId,
      orderId: order.id,
      plan: "bronze",
      amount: "5.00",
      currency: "USD",
      status: "CREATED",
      sajuInput,
      createdAt: new Date().toISOString()
    }

    const saved = await redisCommand([
      "SET",
      `kupfate:order:${order.id}`,
      JSON.stringify(orderData),
      "EX",
      86400,
      "NX"
    ])

    if (saved !== "OK") {
      throw new Error("Redis order storage failed")
    }

    const response = NextResponse.json({
      orderId: order.id,
      approvalUrl
    })

    response.cookies.set(
      "kupfate_checkout",
      sessionId,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24
      }
    )

    return response

  } catch (error) {
    console.error("Create order failed", error)

    return NextResponse.json(
      { error: "Unable to create order" },
      { status: 502 }
    )
  }
}
