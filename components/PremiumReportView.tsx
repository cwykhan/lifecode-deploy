"use client"
import BilingualReport from "@/components/BilingualReport"
import Txt from "@/components/TranslatedText"
import Bi from "@/components/BilingualText"

import FiveEnergyDonut from "@/components/FiveEnergyDonut"
import AnnualFortuneChart from "@/components/AnnualFortuneChart"
import LifePhaseFortune from "@/components/LifePhaseFortune"

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
      <div className="rounded-3xl border border-yellow-300/30 bg-white p-8">
        <p className="text-sm uppercase tracking-[0.45em] text-[#725b38]">
          {plan.toUpperCase()} UNLOCKED
        </p>

        <h2 className="mt-4 text-5xl font-black text-[#725b38]">
          {planTitle[plan] || "Premium Report"}
        </h2>

        <p className="mt-4 text-lg leading-8 text-[#6d6675]"><Bi en="Your premium LifeCode report is unlocked. This dashboard converts your planetary energy structure into practical life signals." ko="유료 리포트가 열렸습니다. 기운의 구조를 삶의 여러 영역과 연결해 살펴봅니다." /></p>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {[
          ["Career", careerScore],
          ["Wealth", wealthScore],
          ["Relationship", relationshipScore],
          ["Health", healthScore]
        ].map(([name, score]: any) => (
          <div key={name} className="rounded-3xl border border-[#e5dfea] bg-white p-6 text-center">
            <p className="text-sm uppercase tracking-widest text-[#6d6675]">
              <Txt text={name} /> Signal
            </p>

            <div className="mx-auto mt-5 grid h-32 w-32 place-items-center rounded-full border border-yellow-300/30 bg-[#eee7f5]">
              <span className="text-4xl font-black text-[#725b38]">
                {score}
              </span>
            </div>

            <p className="mt-4 text-sm text-[#6d6675]">/ 100</p>
          </div>
        ))}
      </div>

      <FiveEnergyDonut result={result} />

      <div className="rounded-3xl border border-cyan-300/20 bg-white p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-[#516d88]"><Bi en="Energy Balance Map" ko="오행 균형 지도" /></p>

        <div className="mt-6 space-y-5">
          {["Tree", "Fire", "Earth", "Metal", "Water"].map((name) => {
            const value = ratio[name] || 0
            return (
              <div key={name}>
                <div className="flex justify-between text-sm font-bold text-[#6d6675]">
                  <span><Txt text={name} /></span>
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
        <div className="rounded-3xl border border-yellow-300/20 bg-[#faf3e6] p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#725b38]"><Bi en="Dominant Energy" ko="두드러진 기운" /></p>
          <h3 className="mt-4 text-4xl font-black text-[#725b38]">
            <Txt text={dominant} />
          </h3>
          <p className="mt-4 leading-8 text-[#6d6675]"><Bi en="This is the energy that repeats most strongly in your visible life pattern. It creates your natural rhythm, but it can also become your repeating limitation." ko="명식에서 두드러지게 나타나는 기운입니다. 타고난 리듬을 만들기도 하지만, 반복되는 한계로 나타날 수도 있습니다." /></p>
        </div>

        <div className="rounded-3xl border border-blue-300/20 bg-[#edf2f8] p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#516d88]"><Bi en="Useful Energy" ko="용신 · 도움이 되는 기운" /></p>
          <h3 className="mt-4 text-4xl font-black text-[#516d88]">
            <Txt text={useful} />
          </h3>
          <p className="mt-4 leading-8 text-[#6d6675]"><Bi en="This is the correction energy. When this energy becomes active, decisions become clearer and your life pattern becomes more stable." ko="균형을 돕는 기운입니다. 이를 삶에 활용하는 방향을 통해 판단과 생활 패턴을 돌아봅니다." /></p>
        </div>
      </div>

      
      <div className="rounded-3xl border border-emerald-300/20 bg-white p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-[#4c7863]"><Bi en="Life Phase Fortune Map" ko="생애 시기별 흐름" /></p>

        <h3 className="mt-4 text-4xl font-black text-[#4c7863]"><Bi en="Early · Youth · Middle · Mature · Later Life" ko="초년 · 청년 · 중년 · 장년 · 노년" /></h3>

        <div className="mt-8 space-y-5">
          {[
            ["Early Life", "0-19", 58, "Foundation period. Family environment, early learning, and emotional imprint are formed."],
            ["Youth Fortune", "20-34", 66, "Expansion period. Career direction, relationships, and self-identity begin to take shape."],
            ["Middle Life", "35-49", 78, "Achievement period. Wealth, career authority, and major life responsibilities become stronger."],
            ["Mature Life", "50-64", 84, "Influence period. Reputation, leadership, teaching, consulting, or asset consolidation become important."],
            ["Later Life", "65+", 72, "Legacy period. Wisdom, family influence, accumulated resources, and spiritual direction become central."]
          ].map(([phase, age, score, desc]: any) => (
            <div key={phase} className="rounded-2xl border border-[#e5dfea] bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-black text-[#4c7863]"><Txt text={phase} /></p>
                  <p className="text-sm text-[#6d6675]">Age {age}</p>
                </div>

                <p className="text-3xl font-black text-[#725b38]">
                  {score}
                </p>
              </div>

              <div className="mt-4 h-4 rounded-full bg-white/10">
                <div
                  className="h-4 rounded-full bg-emerald-300"
                  style={{ width: `${score}%` }}
                />
              </div>

              <p className="mt-4 text-sm leading-7 text-[#6d6675]">
                <Txt text={desc} />
              </p>
            </div>
          ))}
        </div>
      </div>

      <LifePhaseFortune result={result} />

      <AnnualFortuneChart result={result} />

      <div className="rounded-3xl border border-purple-300/20 bg-white p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-[#79618c]"><Bi en="10-Year Life Cycle Preview" ko="10년 주기 미리보기" /></p>

        <div className="mt-6 space-y-5">
          {cycleRows.map(([label, score, desc]: any) => (
            <div key={label} className="rounded-2xl border border-[#e5dfea] bg-white p-5">
              <div className="flex justify-between text-sm font-black text-[#6d6675]">
                <span><Txt text={label} /></span>
                <span>{score}%</span>
              </div>
              <div className="mt-3 h-4 rounded-full bg-white/10">
                <div
                  className="h-4 rounded-full bg-purple-300"
                  style={{ width: `${score}%` }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-[#6d6675]">
                <Txt text={desc} />
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-yellow-300/20 bg-white p-8 whitespace-pre-line text-lg leading-9 text-[#373341]">
        <BilingualReport report={report} result={result} />
      </div>
    </div>
  )
}
