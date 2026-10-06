"use client"
import Txt from "@/components/TranslatedText"
import Bi from "@/components/BilingualText"

import { monthFieldName } from "@/lib/monthField"

export default function MonthField({ result }: { result:any }) {
  const idx = result?.pillars?.month?.branch?.index ?? 0
  const field = monthFieldName[idx]

  return (
    <div className="rounded-3xl border border-cyan-300/20 bg-white p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-[#516d88]"><Bi en="Month Field" ko="월지의 기운" /></p>

      <h2 className="mt-4 text-4xl font-black text-[#516d88]">
        <Txt text={field} />
      </h2>

      <p className="mt-4 text-lg leading-8 text-[#6d6675]"><Bi en="The Month Field is the strongest environmental influence in your birth structure. It represents the season, atmosphere, and life environment surrounding your core energy." ko="월지는 명식에서 계절과 환경의 영향을 나타냅니다. 나의 중심 기운을 둘러싼 계절, 분위기, 삶의 환경을 살펴봅니다." /></p>

      <p className="mt-4 text-[#6d6675]"><Bi en="Detailed Month Field interpretation is included in premium reports." ko="월지에 대한 자세한 해석은 유료 리포트에 포함됩니다." /></p>
    </div>
  )
}
