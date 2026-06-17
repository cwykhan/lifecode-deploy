"use client"

export default function FounderPlatinumBanner() {
  return (
    <div className="rounded-3xl border border-yellow-300/30 bg-gradient-to-r from-yellow-950/30 via-black to-black p-8 shadow-[0_0_80px_rgba(255,215,120,0.12)]">
      <p className="text-sm uppercase tracking-[0.45em] text-yellow-300">
        Platinum Founder Edition
      </p>

      <h2 className="mt-5 text-4xl font-black text-yellow-100">
        Founder Handwritten Destiny Chart
      </h2>

      <p className="mt-5 text-lg leading-8 text-gray-300">
        Platinum clients receive a traditional Korean brush-written destiny chart
        personally prepared by the founder of K-UPFATE.
      </p>

      <p className="mt-4 text-gray-400">
        This exclusive handwritten chart is not available in Free, Bronze, Silver, or Gold.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <span className="rounded-full border border-yellow-300/20 px-4 py-2 text-yellow-200">
          Founder Written
        </span>
        <span className="rounded-full border border-yellow-300/20 px-4 py-2 text-yellow-200">
          Traditional Korean Calligraphy
        </span>
        <span className="rounded-full border border-yellow-300/20 px-4 py-2 text-yellow-200">
          Platinum Exclusive
        </span>
      </div>
    </div>
  )
}
