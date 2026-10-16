import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET
  const webhookId = process.env.PAYPAL_WEBHOOK_ID

  if (!clientId || !secret || !webhookId) {
    console.error("PayPal webhook configuration missing")
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 503 }
    )
  }

  try {
    const rawBody = await req.text()
    const event = JSON.parse(rawBody)

    const auth = Buffer.from(
      `${clientId}:${secret}`
    ).toString("base64")

    const tokenResponse = await fetch(
      "https://api-m.paypal.com/v1/oauth2/token",
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
      return NextResponse.json(
        { error: "PayPal authentication failed" },
        { status: 502 }
      )
    }

    const tokenData = await tokenResponse.json()

    const verificationResponse = await fetch(
      "https://api-m.paypal.com/v1/notifications/verify-webhook-signature",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auth_algo: req.headers.get("paypal-auth-algo"),
          cert_url: req.headers.get("paypal-cert-url"),
          transmission_id: req.headers.get("paypal-transmission-id"),
          transmission_sig: req.headers.get("paypal-transmission-sig"),
          transmission_time: req.headers.get("paypal-transmission-time"),
          webhook_id: webhookId,
          webhook_event: event
        }),
        cache: "no-store"
      }
    )

    if (!verificationResponse.ok) {
      return NextResponse.json(
        { error: "Signature verification failed" },
        { status: 400 }
      )
    }

    const verification = await verificationResponse.json()

    if (verification.verification_status !== "SUCCESS") {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      )
    }

    console.log("Verified PayPal event:", {
      id: event.id,
      type: event.event_type
    })

    // 결제 검증 및 구매 권한 지급은 다음 단계에서 구현
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error("PayPal webhook processing error", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    )
  }
}
