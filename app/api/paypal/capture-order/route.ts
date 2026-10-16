
import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "node:crypto"
import { redisCommand } from "@/lib/server/redis"

export const runtime = "nodejs"

const PAYPAL_API = "https://api-m.paypal.com"

type Money = {
  currency_code?: string
  value?: string
}

type Capture = {
  id?: string
  status?: string
  amount?: Money
  payee?: {
    merchant_id?: string
  }
}

type PurchaseUnit = {
  custom_id?: string
  amount?: Money
  payee?: {
    merchant_id?: string
  }
  payments?: {
    captures?: Capture[]
  }
}

type PayPalOrder = {
  id?: string
  status?: string
  intent?: string
  purchase_units?: PurchaseUnit[]
}

type OrderRecord = {
  sessionId: string
  orderId: string
  plan: string
  amount: string
  currency: string
  status: string
  createdAt: string
}

function fail(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status }
  )
}

async function getAccessToken(
  clientId: string,
  secret: string
): Promise<string> {
  const auth = Buffer.from(
    `${clientId}:${secret}`
  ).toString("base64")

  const response = await fetch(
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

  if (!response.ok) {
    throw new Error("PayPal authentication failed")
  }

  const data = await response.json()

  if (typeof data.access_token !== "string") {
    throw new Error("PayPal access token missing")
  }

  return data.access_token
}

async function fetchOrder(
  orderId: string,
  accessToken: string
): Promise<PayPalOrder> {
  const response = await fetch(
    `${PAYPAL_API}/v2/checkout/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      cache: "no-store"
    }
  )

  if (!response.ok) {
    throw new Error("PayPal order lookup failed")
  }

  return response.json()
}

// 결제 캡처 전 주문 검증
function verifyOrderDetails(
  order: PayPalOrder,
  orderId: string,
  sessionId: string,
  merchantId: string
): boolean {
  if (order.id !== orderId) {
    return false
  }

  if (order.intent !== "CAPTURE") {
    return false
  }

  if (order.purchase_units?.length !== 1) {
    return false
  }

  const unit = order.purchase_units[0]

  if (unit.custom_id !== sessionId) {
    return false
  }

  if (
    unit.amount?.currency_code !== "USD" ||
    unit.amount?.value !== "5.00"
  ) {
    return false
  }

  if (unit.payee?.merchant_id !== merchantId) {
    return false
  }

  return true
}

// 결제 캡처 후 실제 수취 내역 검증
function verifyCapture(
  order: PayPalOrder,
  merchantId: string
): string | null {
  if (order.status !== "COMPLETED") {
    return null
  }

  const unit = order.purchase_units?.[0]
  const captures = unit?.payments?.captures

  if (!captures || captures.length !== 1) {
    return null
  }

  const capture = captures[0]

  if (
    !capture.id ||
    capture.status !== "COMPLETED" ||
    capture.amount?.currency_code !== "USD" ||
    capture.amount?.value !== "5.00"
  ) {
    return null
  }

  if (
    capture.payee?.merchant_id &&
    capture.payee.merchant_id !== merchantId
  ) {
    return null
  }

  return capture.id
}

export async function POST(request: NextRequest) {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET
  const merchantId = process.env.PAYPAL_MERCHANT_ID

  if (!clientId || !secret || !merchantId) {
    return fail("Payment configuration missing", 503)
  }

  try {
    const body = await request.json()
    const orderId = body?.orderId

    if (
      typeof orderId !== "string" ||
      !/^[A-Z0-9]{10,30}$/.test(orderId)
    ) {
      return fail("Invalid order ID", 400)
    }

    // 브라우저 구매 세션 확인
    const sessionId = request.cookies.get(
      "kupfate_checkout"
    )?.value

    if (
      !sessionId ||
      !/^[0-9a-f-]{36}$/.test(sessionId)
    ) {
      return fail("Checkout session missing", 401)
    }

    // Redis에 저장된 주문 확인
    const stored = await redisCommand([
      "GET",
      `kupfate:order:${orderId}`
    ])

    if (!stored) {
      return fail("Order not found", 404)
    }

    const record = JSON.parse(stored) as OrderRecord

    if (
      record.sessionId !== sessionId ||
      record.orderId !== orderId ||
      record.plan !== "bronze" ||
      record.amount !== "5.00" ||
      record.currency !== "USD"
    ) {
      return fail("Order session mismatch", 403)
    }

    const accessToken = await getAccessToken(
      clientId,
      secret
    )

    const lockKey = `kupfate:capture-lock:${orderId}`
    const lockValue = randomUUID()

    // 주문별 중복 처리 방지
    const locked = await redisCommand([
      "SET",
      lockKey,
      lockValue,
      "NX",
      "EX",
      120
    ])

    if (locked !== "OK") {
      return fail("Payment processing", 409)
    }

    try {
      let order = await fetchOrder(
        orderId,
        accessToken
      )

      // 캡처 전에 금액·통화·수취인·세션 확인
      if (
        !verifyOrderDetails(
          order,
          orderId,
          sessionId,
          merchantId
        )
      ) {
        return fail("Order verification failed", 403)
      }

      if (order.status === "APPROVED") {
        const captureResponse = await fetch(
          `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              "PayPal-Request-Id":
                `kupfate-${orderId}`
            },
            body: "{}",
            cache: "no-store"
          }
        )

        if (!captureResponse.ok) {
          // 네트워크 오류나 중복 요청 가능성을 고려해
          // PayPal의 실제 주문 상태를 다시 확인
          const latest = await fetchOrder(
            orderId,
            accessToken
          )

          if (latest.status !== "COMPLETED") {
            throw new Error("PayPal capture failed")
          }
        }

        order = await fetchOrder(
          orderId,
          accessToken
        )
      }

      if (order.status !== "COMPLETED") {
        return fail("Payment not completed", 409)
      }

      // 캡처 완료 후 최종 검증
      if (
        !verifyOrderDetails(
          order,
          orderId,
          sessionId,
          merchantId
        )
      ) {
        return fail("Final order verification failed", 403)
      }

      const captureId = verifyCapture(
        order,
        merchantId
      )

      if (!captureId) {
        return fail("Capture verification failed", 403)
      }

      // 검증된 결제만 Redis에 기록
      const paymentKey =
        `kupfate:payment:${orderId}`

      const paymentData = {
        orderId,
        captureId,
        sessionId,
        plan: "bronze",
        amount: "5.00",
        currency: "USD",
        merchantId,
        status: "COMPLETED",
        verifiedAt: new Date().toISOString()
      }

      const saved = await redisCommand([
        "SET",
        paymentKey,
        JSON.stringify(paymentData),
        "NX"
      ])

      if (saved !== "OK") {
        const existing = await redisCommand([
          "GET",
          paymentKey
        ])

        if (!existing) {
          return fail("Payment record unavailable", 503)
        }

        const previous = JSON.parse(existing)

        if (
          previous.captureId !== captureId ||
          previous.sessionId !== sessionId ||
          previous.merchantId !== merchantId ||
          previous.status !== "COMPLETED"
        ) {
          return fail("Payment record conflict", 409)
        }
      }

      return NextResponse.json({
        verified: true,
        plan: "bronze",
        orderId
      })

    } finally {
      // 잠금 소유권이 일치하는 경우에만 해제
      const unlockScript =
        'if redis.call("GET", KEYS[1]) == ARGV[1] then ' +
        'return redis.call("DEL", KEYS[1]) else return 0 end'

      await redisCommand([
        "EVAL",
        unlockScript,
        1,
        lockKey,
        lockValue
      ])
    }

  } catch (error) {
    console.error("Capture order failed", error)

    return fail("Payment processing failed", 502)
  }
}

