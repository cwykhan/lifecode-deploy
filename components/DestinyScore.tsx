"use client"
import Txt from "@/components/TranslatedText"
import Bi from "@/components/BilingualText"

export default function DestinyScore({ result }: { result: any }) {
  const dominantValue = result?.strength?.value || 50
  const score = Math.min(98, Math.max(42, Math.round(60 + dominantValue / 2)))

  const label =
    score >= 85 ? "Excellent Potential" :
    score >= 70 ? "Strong Potential" :
    score >= 55 ? "Balanced Potential" :
    "Developing Potential"

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-yellow-400/30 bg-white p-8 shadow-sm transition duration-300 hover:border-yellow-300/60 hover:shadow-[0_0_90px_rgba(255,215,120,0.24)]">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yellow-300/10 blur-3xl" />

      <p className="relative text-sm uppercase tracking-[0.45em] text-[#725b38]"><Bi en="Destiny Score" ko="사주 구조 점수" /></p>

      <div className="relative mt-8 grid place-items-center">
        <div className="relative grid h-56 w-56 place-items-center rounded-full border border-yellow-300/30 bg-[#eee7f5] shadow-sm">
          <div className="absolute inset-3 rounded-full border border-yellow-200/20" />
          <div className="absolute inset-8 rounded-full border border-red-300/10" />

          <div className="text-center">
            <p className="text-7xl font-black text-[#725b38]">
              {score}
            </p>
            <p className="text-lg font-bold text-[#6d6675]">
              / 100
            </p>
          </div>
        </div>
      </div>

      <p className="relative mt-8 text-center text-2xl font-black text-[#373341]">
        <Txt text={label} />
      </p>

      <p className="relative mt-4 text-center leading-7 text-[#6d6675]"><Bi en="This score reflects the visible structure, dominant energy, and balance potential of your LifeCode pattern." ko="명식의 구조와 두드러진 기운, 균형 가능성을 표현한 점수입니다." /></p>
    </div>
  )
}
