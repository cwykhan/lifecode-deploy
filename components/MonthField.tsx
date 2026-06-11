"use client"

import { monthFieldName } from "@/lib/monthField"

export default function MonthField({ result }: { result:any }) {
  const idx = result?.pillars?.month?.branch?.index ?? 0
  const field = monthFieldName[idx]

  return (
    <div className="rounded-3xl border border-cyan-300/20 bg-black/70 p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">
        Month Field
      </p>

      <h2 className="mt-4 text-4xl font-black text-cyan-100">
        {field}
      </h2>

      <p className="mt-4 text-lg leading-8 text-gray-300">
        The Month Field is the strongest environmental influence in your birth structure.
        It represents the season, atmosphere, and life environment surrounding your core energy.
      </p>

      <p className="mt-4 text-gray-400">
        Detailed Month Field interpretation is included in premium reports.
      </p>
    </div>
  )
}
