"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

type ReportData = {
  verified: boolean
  plan: string
  orderId: string
  result: any
  report: string
}

type ApiResponse = {
  verified?: boolean
  plan?: string
  error?: string
}

const MAX_CAPTURE_ATTEMPTS = 5
const RETRY_DELAY_MS = 2000

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function postOrder(
  url: string,
  orderId: string
): Promise<{ response: Response; data: ApiResponse }> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin",
    cache: "no-store",
    body: JSON.stringify({ orderId })
  })

  const data = (await response.json()) as ApiResponse

  return { response, data }
}

async function verifyPayment(orderId: string) {
  for (
    let attempt = 1;
    attempt <= MAX_CAPTURE_ATTEMPTS;
    attempt++
  ) {
    const { response, data } = await postOrder(
      "/api/paypal/capture-order",
      orderId
    )

    if (response.ok && data.verified === true) {
      return
    }

    const retryable =
      response.status === 409 &&
      data.error === "Payment processing"

    if (
      retryable &&
      attempt < MAX_CAPTURE_ATTEMPTS
    ) {
      await delay(RETRY_DELAY_MS)
      continue
    }

    throw new Error(
      data.error || "Payment verification failed."
    )
  }
}

export default function SuccessPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [data, setData] = useState<ReportData | null>(null)

  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const completePayment = async () => {
      try {
        const params = new URLSearchParams(
          window.location.search
        )

        const orderId = params.get("token")

        if (
          !orderId ||
          !/^[A-Z0-9]{10,30}$/.test(orderId)
        ) {
          throw new Error(
            "Valid PayPal order ID is missing."
          )
        }

        await verifyPayment(orderId)

        const { response, data: reportData } =
          await postOrder(
            "/api/paypal/report",
            orderId
          )

        if (
          !response.ok ||
          reportData.verified !== true ||
          reportData.plan !== "bronze"
        ) {
          throw new Error(
            reportData.error ||
            "Premium report loading failed."
          )
        }

        setData(reportData as ReportData)

      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Payment processing failed."
        )
      } finally {
        setLoading(false)
      }
    }

    void completePayment()
  }, [])

  return (
    <main className="min-h-screen bg-[#faf9f6] px-5 py-12 text-slate-800">
      <div className="mx-auto max-w-4xl">

        <header className="mb-10 text-center">
          <Link
            href="/"
            className="text-3xl font-black tracking-widest text-amber-800"
          >
            ✧ K-UPFATE.
          </Link>
        </header>

        {loading && (
          <div className="rounded-3xl border border-amber-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-amber-800">
              Verifying Your Payment
            </h1>
            <p className="mt-4 text-slate-600">
              결제를 확인하고 개인별 사주 리포트를 준비하고 있습니다.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-red-700">
              Payment Verification Pending
            </h1>
            <p className="mt-4 text-slate-600">
              결제 또는 리포트 확인을 완료하지 못했습니다.
            </p>
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              이미 결제하셨다면 다시 결제하지 마시고
              이 페이지에서 다시 확인해 주세요.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-amber-600 px-6 py-3 font-bold text-white"
            >
              Retry / 다시 확인
            </button>
          </div>
        )}

        {!loading && data && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-amber-300 bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-bold tracking-widest text-amber-700">
                PAYMENT VERIFIED
              </p>
              <h1 className="mt-4 text-3xl font-black text-amber-800">
                Your Bronze Report Is Ready
              </h1>
              <p className="mt-3 text-slate-600">
                결제가 확인되었습니다. 개인별 브론즈 리포트가 열렸습니다.
              </p>
            </div>

            <section className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-black text-amber-800">
                Explorer Report · Bronze $5
              </h2>

              <div className="mt-8 whitespace-pre-line text-lg leading-9 text-slate-700">
                {data.report}
              </div>
            </section>

            <div className="text-center">
              <Link
                href="/"
                className="inline-block rounded-xl border border-amber-300 px-6 py-3 font-bold text-amber-800"
              >
                K-UPFATE Home / 홈으로
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
