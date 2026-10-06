"use client"

import { useEffect, useState } from "react"
import Landing from "@/components/Landing"
import Bi from "@/components/BilingualText"
import { generateReport } from "@/lib/reportText"
import { getBronzeReport, getSilverReport, getGoldReport, getPlatinumReport } from "@/lib/premiumReports"
import { generateDestinyExperience } from "@/lib/destinyCode"
import PayPalButton from "@/components/PayPalButton"
import ShareSignatureButton from "@/components/ShareSignatureButton"
import FounderPlatinumBanner from "@/components/FounderPlatinumBanner"
import PremiumReportView from "@/components/PremiumReportView"
import ZodiacAvatar from "@/components/ZodiacAvatar"
import CheonmunStarAnimal from "@/components/CheonmunStarAnimal"
import DestinyScore from "@/components/DestinyScore"
import DestinyCharacter from "@/components/DestinyCharacter"
import WealthRelationshipStyle from "@/components/WealthRelationshipStyle"
import PlanetBirthSignature from "@/components/PlanetBirthSignature"
import CosmicIdentity from "@/components/CosmicIdentity"
import TenSpiritPlainReading from "@/components/TenSpiritPlainReading"
import MonthField from "@/components/MonthField"

const paidPlans = [
  { id: "bronze", name: "BRONZE", price: "$5", desc: "Core reading and Useful Energy." },
  { id: "silver", name: "SILVER", price: "$15", desc: "Career, balance, and hidden pattern guide." },
  { id: "gold", name: "GOLD", price: "$30", desc: "Career, wealth, relationship, and health report." },
  { id: "platinum", name: "PLATINUM", price: "$50", desc: "Full strategic K-UPFATE blueprint." }
]

const reportPlanMap: Record<string, string> = {
  bronze: "commons",
  silver: "merchants",
  gold: "nobility",
  platinum: "emperor"
}

const energyColor: Record<string, string> = {
  Tree: "bg-blue-500",
  Fire: "bg-red-500",
  Earth: "bg-yellow-400",
  Metal: "bg-zinc-300",
  Water: "bg-neutral-950"
}

function getTodayLocalDate() {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, "0")
  const dd = String(now.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

export default function Home() {
  const [birthDate, setBirthDate] = useState(getTodayLocalDate())
  const [birthTime, setBirthTime] = useState("00:00")
  const [gender, setGender] = useState("male")
  const [selectedPlan, setSelectedPlan] = useState("bronze")
  const [paidPlan, setPaidPlan] = useState("")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [visitorCount, setVisitorCount] = useState<number>(10000)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const unlocked = params.get("unlocked")
    const savedResult = localStorage.getItem("lastSajuResult")

    if (unlocked) {
      setPaidPlan(unlocked)
      setSelectedPlan(unlocked)

      if (savedResult) {
        try {
          setResult(JSON.parse(savedResult))
        } catch {}
      }
    }
  }, [])


  useEffect(() => {
    const loadVisitorCount = async () => {
      try {
        const res = await fetch("/api/visitors", {
          method: "POST",
          cache: "no-store"
        })

        const data = await res.json()

        if (
          typeof data?.count === "number" &&
          Number.isFinite(data.count)
        ) {
          setVisitorCount(Math.max(10000, data.count))
        }
      } catch {
        setVisitorCount(10000)
      }
    }

    loadVisitorCount()
  }, [])

  const decode = async () => {
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const [year, month, day] = birthDate.split("-").map(Number)
      const [hour, minute] = birthTime.split(":").map(Number)

      const res = await fetch("/api/saju", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, month, day, hour, minute, gender, plan: "free" })
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(JSON.stringify(data, null, 2))
        return
      }

      setResult({ ...data, input: { year, month, day, hour, minute, gender } })
      localStorage.setItem("lastSajuResult", JSON.stringify({ ...data, input: { year, month, day, hour, minute, gender } }))
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError("")
  }

  const pillars = result?.pillars
  const five = result?.fiveEnergy?.ratio
  const destiny = result ? generateDestinyExperience(result) : null
  const report = result ? generateReport(result, reportPlanMap[selectedPlan]) : ""

  return (
    <main className="site-shell">
      <section>
        <div className="site-container">
          {!result && <Landing birthDate={birthDate} birthTime={birthTime} gender={gender} loading={loading} visitorCount={visitorCount} setBirthDate={setBirthDate} setBirthTime={setBirthTime} setGender={setGender} decode={decode} />}
          {result && <header className="site-header"><a href="/" className="brand"><span className="brand-mark">✧</span>K-UPFATE.</a><button onClick={reset} className="nav-reading"><Bi en="New reading ↗" ko="다른 사주 보기" /></button></header>}

          {error && (
            <section className="mt-8 rounded-3xl border border-red-500 bg-[#faeeee] p-6">
              <h2 className="text-xl font-bold text-[#986366]"><Bi en="Engine Error" ko="분석 중 오류가 발생했습니다" /></h2>
              <pre className="mt-4 whitespace-pre-wrap text-sm text-[#986366]">{error}</pre>
            </section>
          )}

          {result && pillars && five && destiny && (
            <section className="result-content">
              <div className="rounded-t-3xl bg-white/95 p-8 shadow-xl">
                <p className="text-sm uppercase tracking-[0.55em] text-[#986366]"><Bi en="Free Destiny Signal Detected" ko="무료 사주 분석 결과" /></p>

                <h1 className="mt-4 text-6xl font-black tracking-tight text-[#725b38]">
                  <Bi en={destiny.rarity} ko={({"COMMON STRUCTURE":"기본 기운 구조","CELESTIAL VARIANT":"집중된 기운 구조","EXTREME STRUCTURE":"강한 기운 구조","RARE STRUCTURE":"특징적인 기운 구조"} as Record<string,string>)[destiny.rarity]} />
                </h1>

                <div className="mt-8 rounded-2xl border border-amber-300/60 bg-[#fffdf8] p-7">
                  <p className="text-sm font-bold uppercase tracking-widest text-[#6d6675]"><Bi en="LIFE CODE" ko="나의 라이프 코드" /></p>
                  <p className="mt-3 text-5xl font-black tracking-wide text-amber-700">
                    {destiny.lifeCode}
                  </p>
                </div>

                <p className="mt-8 max-w-5xl text-2xl font-semibold leading-10 text-slate-800">
                  <Bi en={destiny.rarityText} ko={({"COMMON STRUCTURE":"기본적인 균형 안에 당신만의 기운과 성향이 담겨 있습니다.","CELESTIAL VARIANT":"기운이 강하게 집중된 구조로, 뚜렷한 특징을 보여줍니다.","EXTREME STRUCTURE":"강한 기운이 영향력과 불균형의 가능성을 함께 만듭니다.","RARE STRUCTURE":"하나의 두드러진 기운이 전체 성향에 큰 영향을 줍니다."} as Record<string,string>)[destiny.rarity]} />
                </p>
              </div>

              <div className="grid gap-8 bg-[#f5f3ee]/95 p-8">
                <ZodiacAvatar pillar={pillars.year} result={result} />

                <CheonmunStarAnimal result={result} />

                <PlanetBirthSignature pillars={pillars} result={result} />

                <CosmicIdentity result={result} />

                <MonthField result={result} />

                <TenSpiritPlainReading result={result} />


                <div className="grid gap-6 md:grid-cols-2">
                  <DestinyScore result={result} />
                  <DestinyCharacter result={result} />
                </div>

                <WealthRelationshipStyle result={result} />

                <div>
                  <h2 className="text-4xl font-black text-[#516d88]"><Bi en="Four Pillars" ko="사주 명식 · 四柱" /></h2>

                  <div className="mt-8 grid grid-cols-2 gap-7 md:grid-cols-4">
                    {["year", "month", "day", "hour"].map((key) => {
                      const p = pillars[key]
                      return (
                        <div key={key} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                          <p className="text-sm uppercase tracking-widest text-[#6d6675]"><Bi en={key} ko={({year:"년주",month:"월주",day:"일주",hour:"시주"} as Record<string,string>)[key]} /></p>
                          <p className="mt-5 text-6xl font-black text-[#725b38]">
                            {p.stem.symbol}{p.branch.symbol}
                          </p>
                          <p className="mt-5 text-lg font-semibold text-slate-700">
                            {p.stem.element} / {p.branch.element}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h2 className="text-4xl font-black text-[#986366]"><Bi en="Five Energy Ratio" ko="오행 비율 · 五行" /></h2>

                  <div className="mt-8 space-y-5">
                    {Object.entries(five).map(([name, value]: any) => (
                      <div key={name}>
                        <div className="flex justify-between text-lg font-bold">
                          <span><Bi en={name} ko={({Tree:"목 · T",Fire:"화 · F",Earth:"토 · E",Metal:"금 · M",Water:"수 · W"} as Record<string,string>)[name]} /></span>
                          <span>{value}%</span>
                        </div>
                        <div className="mt-2 h-5 rounded-full bg-slate-200">
                          <div
                            className={`h-5 rounded-full ${energyColor[name] || "bg-blue-500"}`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-amber-300/50 bg-white p-8 shadow-sm">
                  <h2 className="text-4xl font-black text-amber-700"><Bi en="Unlock Full K-UPFATE Report" ko="더 깊이 알아보는 나의 사주" /></h2>

                  <p className="mt-4 text-lg leading-8 text-slate-700"><Bi en="The free scan reveals only the surface structure. Choose a premium tier to unlock deeper interpretation." ko="무료 분석으로 기본 구조를 확인하고, 유료 리포트에서 더 자세한 해석을 살펴보세요." /></p>

                  <FounderPlatinumBanner />

                  <div className="mt-8 grid gap-5 md:grid-cols-4">
                    {paidPlans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={[
                          "rounded-2xl border p-5 text-left transition",
                          selectedPlan === plan.id
                            ? "border-yellow-300 bg-yellow-500/10 shadow-[0_0_40px_rgba(255,215,120,0.18)]"
                            : "border-slate-200 bg-[#faf9f6] hover:border-amber-400"
                        ].join(" ")}
                      >
                        <p className="text-lg font-black tracking-widest text-[#725b38]"><Bi en={plan.name} ko={({bronze:"브론즈",silver:"실버",gold:"골드",platinum:"플래티넘"} as Record<string,string>)[plan.id]} /></p>
                        <p className="mt-3 text-3xl font-black text-amber-700">{plan.price}</p>
                        <p className="mt-4 text-sm leading-6 text-slate-700"><Bi en={plan.desc} ko={({bronze:"핵심 해석과 용신 안내",silver:"직업·균형·내면 성향 안내",gold:"직업·재물·관계·건강 해석",platinum:"K-UPFATE 종합 리포트"} as Record<string,string>)[plan.id]} /></p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border border-slate-200 bg-[#faf9f6] p-7">
                    <h3 className="text-2xl font-black text-amber-800">
                      <Bi en={paidPlan === selectedPlan ? `${selectedPlan.toUpperCase()} Report Unlocked` : `${selectedPlan.toUpperCase()} Report Preview`} ko={paidPlan === selectedPlan ? "구매한 리포트" : "리포트 미리보기"} />
                    </h3>

                    {paidPlan === selectedPlan ? (
                      <PremiumReportView result={result} plan={selectedPlan} />
                    ) : (
                      <>
                        <div className="mt-5 rounded-2xl border border-amber-300/40 bg-[#fffdf8] p-6 text-lg leading-9 text-slate-700">
                          <p className="font-black text-amber-800"><Bi en="Locked Premium Sections" ko="유료 리포트에 포함된 내용" /></p>
                          <ul className="mt-4 list-disc space-y-2 pl-6">
                            <li><Bi en="Career direction and work pattern" ko="직업 방향과 일하는 방식" /></li>
                            <li><Bi en="Wealth and money flow tendency" ko="재물과 자금 흐름의 성향" /></li>
                            <li><Bi en="Relationship and partner dynamics" ko="관계와 배우자 성향" /></li>
                            <li><Bi en="Health imbalance signal" ko="건강과 기운 불균형의 경향" /></li>
                            <li><Bi en="Hidden risk and correction strategy" ko="내면의 취약점과 균형 방향" /></li>
                            <li><Bi en="Useful Energy deep interpretation" ko="용신에 대한 심층 해석" /></li>
                          </ul>
                        </div>

                        <PayPalButton plan={selectedPlan} />
                      </>
                    )}
                  </div>
                </div>

                <ShareSignatureButton result={result} />

                <button
                  onClick={reset}
                  className="w-fit rounded-2xl border border-yellow-400/40 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 px-10 py-5 text-lg font-black tracking-widest text-black shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,215,0,0.55)]"
                ><Bi en="✦ RE-ENTER DESTINY DATA" ko="다른 생년월일로 다시 보기" /></button>
              </div>
            </section>
          )}

          <footer className="site-footer">
            <div className="flex justify-center gap-6">
              <a href="/privacy" className="hover:text-slate-900"><Bi en="Privacy Policy" ko="개인정보 처리방침" /></a>
              <a href="/terms" className="hover:text-slate-900"><Bi en="Terms of Service" ko="이용약관" /></a>
              <a href="/refund" className="hover:text-slate-900"><Bi en="Refund Policy" ko="환불 안내" /></a>
              <a href="/contact" className="hover:text-slate-900"><Bi en="Contact" ko="문의하기" /></a>
            </div>
            <p className="mt-4"><Bi en="© K-UPFATE. Ancient Korean sky wisdom for modern life." ko="한국 전통의 지혜로 나의 삶을 살펴보세요." /></p>
          </footer>
        </div>
      </section>
    </main>
  )
}
