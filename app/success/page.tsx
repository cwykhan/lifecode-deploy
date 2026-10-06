"use client"
import Bi from "@/components/BilingualText"

import { useEffect, useState } from "react"

export default function SuccessPage() {
  const [plan, setPlan] = useState("bronze")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const selectedPlan = params.get("plan") || "bronze"

    localStorage.setItem("paidPlan", selectedPlan)
    setPlan(selectedPlan)
  }, [])

  return (
    <main className="min-h-screen bg-white p-10 text-[#373341]">
      <h1 className="text-5xl font-black text-[#725b38]"><Bi en="Payment Complete" ko="결제 완료" /></h1>

      <p className="mt-6 text-xl text-[#6d6675]">
        Your {plan.toUpperCase()} LifeCode report has been unlocked.
      </p>

      <a
        href={`/?unlocked=${plan}`}
        className="mt-10 inline-block rounded-xl bg-yellow-500 px-8 py-4 font-black text-black"
      ><Bi en="Return to Unlocked Report" ko="구매한 리포트로 돌아가기" /></a>
    </main>
  )
}
