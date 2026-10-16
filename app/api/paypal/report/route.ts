import { NextRequest, NextResponse } from "next/server"
import { execFileSync } from "node:child_process"
import path from "node:path"

import { redisCommand } from "@/lib/server/redis"
import { getBronzeReport } from "@/lib/server/premiumReports"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type SajuInput = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  gender: "male" | "female"
}

type OrderRecord = {
  sessionId: string
  orderId: string
  plan: string
  amount: string
  currency: string
  sajuInput?: SajuInput
}

type PaymentRecord = {
  sessionId: string
  orderId: string
  plan: string
  amount: string
  currency: string
  status: string
}

function fail(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status }
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const orderId = body?.orderId

    if (
      typeof orderId !== "string" ||
      !/^[A-Z0-9]{10,30}$/.test(orderId)
    ) {
      return fail("Invalid order ID", 400)
    }

    const sessionId =
      request.cookies.get("kupfate_checkout")?.value

    if (!sessionId) {
      return fail("Checkout session missing", 401)
    }

    const [orderRaw, paymentRaw] = await Promise.all([
      redisCommand([
        "GET",
        `kupfate:order:${orderId}`
      ]),
      redisCommand([
        "GET",
        `kupfate:payment:${orderId}`
      ])
    ])

    if (!orderRaw || !paymentRaw) {
      return fail("Verified purchase not found", 403)
    }

    const order = JSON.parse(orderRaw) as OrderRecord
    const payment = JSON.parse(paymentRaw) as PaymentRecord

    if (
      order.orderId !== orderId ||
      payment.orderId !== orderId ||
      order.sessionId !== sessionId ||
      payment.sessionId !== sessionId ||
      order.plan !== "bronze" ||
      payment.plan !== "bronze" ||
      order.amount !== "5.00" ||
      payment.amount !== "5.00" ||
      order.currency !== "USD" ||
      payment.currency !== "USD" ||
      payment.status !== "COMPLETED"
    ) {
      return fail("Purchase verification failed", 403)
    }

    const input = order.sajuInput

    if (!input) {
      return fail("Saju input not found", 404)
    }

    const scriptPath = path.join(
      process.cwd(),
      "engine",
      "node",
      "runSajuEngine.js"
    )

    const output = execFileSync(
      process.execPath,
      [
        scriptPath,
        String(input.year),
        String(input.month),
        String(input.day),
        String(input.hour),
        String(input.minute)
      ],
      {
        encoding: "utf8",
        timeout: 15000,
        maxBuffer: 1024 * 1024
      }
    )

    const result = {
      ...JSON.parse(output),
      input
    }

    const report = getBronzeReport(result)

    return NextResponse.json(
      {
        verified: true,
        plan: "bronze",
        orderId,
        result,
        report
      },
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    )

  } catch (error) {
    console.error("Premium report failed", error)

    return fail("Unable to load premium report", 500)
  }
}
