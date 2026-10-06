"use client"
import Bi from "@/components/BilingualText"

export default function FounderPlatinumBanner() {
  return (
    <div className="rounded-3xl border border-yellow-300/30 bg-gradient-to-r from-yellow-950/30 via-[#fffaf4] to-[#f1eaf7] p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.45em] text-[#725b38]"><Bi en="Platinum Founder Edition" ko="플래티넘 창립자 에디션" /></p>

      <h2 className="mt-5 text-4xl font-black text-[#725b38]"><Bi en="Founder Handwritten Destiny Chart" ko="창립자가 직접 쓰는 명식" /></h2>

      <p className="mt-5 text-lg leading-8 text-[#6d6675]"><Bi en="Platinum clients receive a traditional Korean brush-written destiny chart personally prepared by the founder of K-UPFATE." ko="플래티넘 고객에게는 K-UPFATE 창립자가 직접 붓으로 작성한 전통 명식을 제공합니다." /></p>

      <p className="mt-4 text-[#6d6675]"><Bi en="This exclusive handwritten chart is not available in Free, Bronze, Silver, or Gold." ko="수기 명식은 플래티넘 전용으로, 무료·브론즈·실버·골드에는 포함되지 않습니다." /></p>

      <div className="mt-6 flex flex-wrap gap-3">
        <span className="rounded-full border border-yellow-300/20 px-4 py-2 text-[#725b38]"><Bi en="Founder Written" ko="창립자 직접 작성" /></span>
        <span className="rounded-full border border-yellow-300/20 px-4 py-2 text-[#725b38]"><Bi en="Traditional Korean Calligraphy" ko="전통 붓글씨" /></span>
        <span className="rounded-full border border-yellow-300/20 px-4 py-2 text-[#725b38]"><Bi en="Platinum Exclusive" ko="플래티넘 전용" /></span>
      </div>
    </div>
  )
}
