"use client"

import { useState } from "react"
import Bi from "@/components/BilingualText"

const BRONZE_PAYMENT_LINK =
  "https://www.paypal.com/ncp/payment/T729EHJGQA42L"

// 자동 결제·리포트 연결 테스트 전까지 비활성화
const USE_ORDERS_API = true

type SajuInput = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  gender: string
}

export default function PayPalButton({
  plan,
  sajuInput
}: {
  plan: string
  sajuInput?: SajuInput
}) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (plan !== "bronze") {
      alert(
        "This tier is being prepared. Payment is not available yet.\n" +
        "이 상품은 준비 중으로, 아직 결제할 수 없습니다."
      )
      return
    }

    if (!USE_ORDERS_API) {
      window.open(
        BRONZE_PAYMENT_LINK,
        "_blank",
        "noopener,noreferrer"
      )
      return
    }

    if (!sajuInput) {
      alert(
        "Please generate your reading first.\n" +
        "먼저 사주 분석을 진행해 주세요."
      )
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        "/api/paypal/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin",
          body: JSON.stringify({
            plan: "bronze",
            sajuInput
          })
        }
      )

      if (!response.ok) {
        throw new Error("Order creation failed")
      }

      const data = await response.json()

      if (
        typeof data.orderId !== "string" ||
        typeof data.approvalUrl !== "string"
      ) {
        throw new Error("Invalid PayPal order response")
      }

      const approvalUrl = new URL(data.approvalUrl)

      if (
        approvalUrl.protocol !== "https:" ||
        approvalUrl.hostname !== "www.paypal.com"
      ) {
        throw new Error("Invalid PayPal approval URL")
      }

      window.location.assign(approvalUrl.href)

    } catch (error) {
      console.error("PayPal checkout error", error)

      alert(
        "Unable to start checkout.\n" +
        "결제를 시작할 수 없습니다."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="mt-8 inline-block rounded-2xl border border-[#397cba] bg-[#1b3451] px-8 py-4 text-lg font-black text-[#e9f4ff] transition hover:bg-yellow-500/20 disabled:cursor-wait disabled:opacity-60"
    >
      <Bi
        en={
          plan === "bronze"
            ? loading
              ? "Preparing checkout..."
              : "Pay with PayPal · $5"
            : "Coming soon"
        }
        ko={
          plan === "bronze"
            ? loading
              ? "결제 준비 중..."
              : "PayPal로 브론즈 결제하기"
            : "준비 중 · 결제 불가"
        }
      />
    </button>
  )
}
