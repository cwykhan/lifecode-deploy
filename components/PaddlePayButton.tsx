"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    Paddle?: any
  }
}

const priceMap: Record<string, string | undefined> = {
  merchants: process.env.NEXT_PUBLIC_PADDLE_MERCHANTS_PRICE_ID,
  nobility: process.env.NEXT_PUBLIC_PADDLE_NOBILITY_PRICE_ID,
  emperor: process.env.NEXT_PUBLIC_PADDLE_EMPEROR_PRICE_ID
}

export default function PaddlePayButton({
  plan
}: {
  plan: string
}) {
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

      if (
        process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox"
      ) {
        window.Paddle.Environment.set("sandbox")
      }

      window.Paddle.Initialize({
        token:
          process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
      })

      setReady(true)
    }

    document.body.appendChild(script)
  }, [])

  const openCheckout = () => {
    const priceId = priceMap[plan]

    if (!window.Paddle || !ready || !priceId) {
      alert("Payment system is not ready.")
      return
    }

    window.Paddle.Checkout.open({
      items: [
        {
          priceId,
          quantity: 1
        }
      ],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: window.location.origin
      }
    })
  }

  return (
    <button
      onClick={openCheckout}
      className="mt-8 rounded-2xl border border-yellow-300 bg-yellow-500/10 px-8 py-4 text-lg font-black text-yellow-100 transition hover:bg-yellow-500/20"
    >
      UNLOCK FULL CELESTIAL ANALYSIS
    </button>
  )
}
