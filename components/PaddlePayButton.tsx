"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    Paddle?: any
  }
}

const priceMap: Record<string, string | undefined> = {
  bronze: process.env.NEXT_PUBLIC_PADDLE_BRONZE_PRICE_ID,
  silver: process.env.NEXT_PUBLIC_PADDLE_SILVER_PRICE_ID,
  gold: process.env.NEXT_PUBLIC_PADDLE_GOLD_PRICE_ID,
  platinum: process.env.NEXT_PUBLIC_PADDLE_PLATINUM_PRICE_ID
}

export default function PaddlePayButton({ plan }: { plan: string }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.Paddle) {
      setReady(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js"
    script.async = true

    script.onload = () => {
      if (!window.Paddle) return

      if (process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox") {
        window.Paddle.Environment.set("sandbox")
      }

      window.Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
      })

      setReady(true)
    }

    document.body.appendChild(script)
  }, [])

  const openCheckout = () => {
    const priceId = priceMap[plan]

    if (!priceId) {
      alert(`Price ID is missing for tier: ${plan}`)
      return
    }

    if (!ready || !window.Paddle) {
      alert("Payment system is loading. Please try again.")
      return
    }

    window.Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: `${window.location.origin}/success?plan=${plan}`
      },
      customData: { plan }
    })
  }

  return (
    <button
      onClick={openCheckout}
      className="mt-8 rounded-2xl border border-yellow-300 bg-yellow-500/10 px-8 py-4 text-lg font-black text-yellow-100 transition hover:bg-yellow-500/20"
    >
      UNLOCK {plan.toUpperCase()} REPORT
    </button>
  )
}
