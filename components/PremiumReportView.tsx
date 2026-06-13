"use client"

import FiveEnergyDonut from "@/components/FiveEnergyDonut"

import {
  getBronzeReport,
  getSilverReport,
  getGoldReport,
  getPlatinumReport
} from "@/lib/premiumReports"

const planTitle: Record<string, string> = {
  bronze: "Explorer Report",
  silver: "Navigator Report",
  gold: "Strategist Report",
  platinum: "LifeCode Blueprint"
}

function scoreFrom(value: number, offset: number) {
  return Math.min(96, Math.max(52, Math.round(value + offset)))
}

export default function PremiumReportView({
  result,
  plan
}: {
  result: any
  plan: string
}) {
  const ratio = result?.fiveEnergy?.ratio || {}
  const dominant = result?.strength?.dominantEnergy || "Earth"
  const useful = result?.usefulEnergy || "Metal"
  const strengthValue = result?.strength?.value || 55

  const careerScore = scoreFrom(strengthValue, 18)
  const wealthScore = scoreFrom((ratio.Earth || 20) + (ratio.Metal || 20), 25)
  const relationshipScore = scoreFrom((ratio.Tree || 20) + (ratio.Water || 20), 20)
  const healthScore = scoreFrom(100 - Math.abs((ratio[dominant] || 20) - 30), 0)

  const report =
    plan === "bronze"
      ? getBronzeReport(result)
      : plan === "silver"
      ? getSilverReport(result)
      : plan === "gold"
      ? getGoldReport(result)
      : getPlatinumReport(result)

  const cycleRows = [
    ["Current Cycle", careerScore, "Stabilize your core direction and build repeatable value."],
    ["Next Cycle", wealthScore, "Convert accumulated skill into money, assets, and opportunity."],
    ["Future Cycle", relationshipScore, "Use relationships, trust, and reputation as leverage."]
  ]

  return (
    <div className="mt-5 space-y-8">
      <div className="rounded-3xl border border-yellow-300/30 bg-black/80 p-8">
        <p className="text-sm uppercase tracking-[0.45em] text-yellow-300">
          {plan.toUpperCase()} UNLOCKED
        </p>

        <h2 className="mt-4 text-5xl font-black text-yellow-100">
          {planTitle[plan] || "Premium Report"}
        </h2>

        <p className="mt-4 text-lg leading-8 text-gray-300">
          Your premium LifeCode report is unlocked. This dashboard converts your
          planetary energy structure into practical life signals.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {[
          ["Career", careerScore],
          ["Wealth", wealthScore],
          ["Relationship", relationshipScore],
          ["Health", healthScore]
        ].map(([name, score]: any) => (
          <div key={name} className="rounded-3xl border border-white/10 bg-black/70 p-6 text-center">
            <p className="text-sm uppercase tracking-widest text-gray-400">
              {name} Signal
            </p>

            <div className="mx-auto mt-5 grid h-32 w-32 place-items-center rounded-full border border-yellow-300/30 bg-[radial-gradient(circle,rgba(255,215,120,0.22),rgba(0,0,0,0.9)_62%)]">
              <span className="text-4xl font-black text-yellow-200">
                {score}
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-400">/ 100</p>
          </div>
        ))}
      </div>

      <FiveEnergyDonut result={result} />

      <div className="rounded-3xl border border-cyan-300/20 bg-black/70 p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">
          Energy Balance Map
        </p>

        <div className="mt-6 space-y-5">
          {["Tree", "Fire", "Earth", "Metal", "Water"].map((name) => {
            const value = ratio[name] || 0
            return (
              <div key={name}>
                <div className="flex justify-between text-sm font-bold text-gray-300">
                  <span>{name}</span>
                  <span>{value}%</span>
                </div>
                <div className="mt-2 h-4 rounded-full bg-white/10">
                  <div
                    className="h-4 rounded-full bg-yellow-300"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-yellow-300/20 bg-yellow-950/20 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300">
            Dominant Energy
          </p>
          <h3 className="mt-4 text-4xl font-black text-yellow-100">
            {dominant}
          </h3>
          <p className="mt-4 leading-8 text-gray-300">
            This is the energy that repeats most strongly in your visible life
            pattern. It creates your natural rhythm, but it can also become your
            repeating limitation.
          </p>
        </div>

        <div className="rounded-3xl border border-blue-300/20 bg-blue-950/20 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-200">
            Useful Energy
          </p>
          <h3 className="mt-4 text-4xl font-black text-blue-100">
            {useful}
          </h3>
          <p className="mt-4 leading-8 text-gray-300">
            This is the correction energy. When this energy becomes active,
            decisions become clearer and your life pattern becomes more stable.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-purple-300/20 bg-black/70 p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-purple-200">
          10-Year Life Cycle Preview
        </p>

        <div className="mt-6 space-y-5">
          {cycleRows.map(([label, score, desc]: any) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-black/60 p-5">
              <div className="flex justify-between text-sm font-black text-gray-300">
                <span>{label}</span>
                <span>{score}%</span>
              </div>
              <div className="mt-3 h-4 rounded-full bg-white/10">
                <div
                  className="h-4 rounded-full bg-purple-300"
                  style={{ width: `${score}%` }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-yellow-300/20 bg-black/80 p-8 whitespace-pre-line text-lg leading-9 text-gray-200">
        {report}
      </div>
    </div>
  )
}
