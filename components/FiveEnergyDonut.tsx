"use client"
import Txt from "@/components/TranslatedText"
import Bi from "@/components/BilingualText"

const colors: Record<string, string> = {
  Tree: "#2563eb",
  Fire: "#ef4444",
  Earth: "#facc15",
  Metal: "#c0c0c0",
  Water: "#111827"
}

const labels: Record<string, string> = {
  Tree: "Tree / Jupiter",
  Fire: "Fire / Mars",
  Earth: "Earth / Earth",
  Metal: "Metal / Venus",
  Water: "Water / Mercury"
}

export default function FiveEnergyDonut({ result }: { result: any }) {
  const ratio = result?.fiveEnergy?.ratio || {}

  const items = ["Tree", "Fire", "Earth", "Metal", "Water"].map((name) => ({
    name,
    value: Number(ratio[name] || 0),
    color: colors[name]
  }))

  let current = 0

  const gradient = items
    .map((item) => {
      const start = current
      const end = current + item.value
      current = end
      return `${item.color} ${start}% ${end}%`
    })
    .join(", ")

  return (
    <div className="rounded-3xl border border-yellow-400/30 bg-white p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.45em] text-[#725b38]"><Bi en="Five Planetary Energy Donut" ko="오행 기운 분포" /></p>

      <div className="mt-8 grid gap-8 md:grid-cols-[260px_1fr] md:items-center">
        <div className="mx-auto grid h-60 w-60 place-items-center rounded-full border border-yellow-300/30"
          style={{ background: `conic-gradient(${gradient})` }}
        >
          <div className="grid h-28 w-28 place-items-center rounded-full border border-[#e5dfea] bg-white text-center">
            <p className="text-sm font-black text-[#725b38]"><Bi en="ENERGY" ko="기운" /></p>
            <p className="text-xs text-[#6d6675]"><Bi en="BALANCE" ko="균형" /></p>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between text-sm font-bold text-[#6d6675]">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-4 w-4 rounded-full border border-[#e5dfea]"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{labels[item.name]}</span>
                </div>
                <span>{item.value}%</span>
              </div>

              <div className="mt-2 h-3 rounded-full bg-white/10">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
