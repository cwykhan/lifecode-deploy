"use client"

import { useEffect, useState } from "react"
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
    <main className="min-h-screen bg-[#171717] text-white">
      <section
        className="min-h-screen bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.18), rgba(23,23,23,0.94) 36%, rgba(23,23,23,1) 72%), url('/images/main-destiny.jpg')"
        }}
      >
        <div className="mx-auto max-w-7xl px-8 py-10">
          {!result && (
            <div className="pt-[28vh]">
              <p className="text-sm uppercase tracking-[0.55em] text-red-200">
                Ancient Korean Astronomy Engine
              </p>

              <h1 className="mt-5 text-7xl font-black tracking-tight text-yellow-100">
                K-UPFATE
              </h1>

              <p className="mt-6 max-w-3xl text-2xl font-semibold leading-10 text-white">
                Decode your hidden life pattern through ancient Korean sky wisdom.
              </p>

              <div className="mt-10 grid gap-5 md:grid-cols-4">
                {[
                  ["Planet Signature", "Your core energy pattern and visible life identity."],
                  ["Career Signature", "Your natural work style, talent direction, and achievement path."],
                  ["Wealth Signature", "How you create, keep, and expand money through your life pattern."],
                  ["Relationship Signature", "Your connection style, emotional rhythm, and partner dynamics."]
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-yellow-300/20 bg-black/60 p-5 shadow-[0_0_35px_rgba(255,215,120,0.08)]">
                    <p className="text-lg font-black text-yellow-100">{title}</p>
                    <p className="mt-3 text-sm leading-6 text-gray-300">{desc}</p>
                  </div>
                ))}
              </div>

              <section className="mt-10 rounded-3xl border border-yellow-300/15 bg-black/60 p-8 backdrop-blur-xl">
                <h2 className="text-2xl font-black text-yellow-100">Free Signal Scan</h2>

                <p className="mt-3 text-gray-300">
                  Enter your birth data and discover your Planet Signature before choosing any premium tier.
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm text-gray-300">Birth Date</span>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-black/80 px-4 py-4 text-lg text-white"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-sm text-gray-300">Birth Time</span>
                    <input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-black/80 px-4 py-4 text-lg text-white"
                    />
                  </label>

                  <label className="md:col-span-2">
                    <span className="mb-2 block text-sm text-gray-300">Gender</span>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setGender("male")}
                        className={gender === "male"
                          ? "rounded-xl border border-yellow-300 bg-yellow-500/20 px-4 py-4 text-lg font-black text-yellow-100"
                          : "rounded-xl border border-white/20 bg-black/80 px-4 py-4 text-lg font-black text-gray-300"}
                      >
                        Male
                      </button>

                      <button
                        type="button"
                        onClick={() => setGender("female")}
                        className={gender === "female"
                          ? "rounded-xl border border-yellow-300 bg-yellow-500/20 px-4 py-4 text-lg font-black text-yellow-100"
                          : "rounded-xl border border-white/20 bg-black/80 px-4 py-4 text-lg font-black text-gray-300"}
                      >
                        Female
                      </button>
                    </div>
                  </label>
                </div>

                <button
                  onClick={decode}
                  className="mt-8 rounded-none bg-red-600 px-12 py-5 text-xl font-black tracking-wide text-white transition hover:bg-red-500"
                >
                  {loading ? "SCANNING..." : "FREE SIGNAL SCAN"}
                </button>
              </section>
            </div>
          )}

          {error && (
            <section className="mt-8 rounded-3xl border border-red-500 bg-red-950/70 p-6">
              <h2 className="text-xl font-bold text-red-200">Engine Error</h2>
              <pre className="mt-4 whitespace-pre-wrap text-sm text-red-100">{error}</pre>
            </section>
          )}

          {result && pillars && five && destiny && (
            <section className="pt-[23vh]">
              <div className="rounded-t-3xl bg-[#242424]/95 p-8 shadow-2xl">
                <p className="text-sm uppercase tracking-[0.55em] text-red-200">
                  Free Destiny Signal Detected
                </p>

                <h1 className="mt-4 text-6xl font-black tracking-tight text-yellow-100">
                  {destiny.rarity}
                </h1>

                <div className="mt-8 rounded-2xl border border-yellow-300/20 bg-black/70 p-7">
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-400">LIFE CODE</p>
                  <p className="mt-3 text-5xl font-black tracking-wide text-yellow-300">
                    {destiny.lifeCode}
                  </p>
                </div>

                <p className="mt-8 max-w-5xl text-2xl font-semibold leading-10 text-gray-100">
                  {destiny.rarityText}
                </p>
              </div>

              <div className="grid gap-8 bg-[#242424]/95 p-8">
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
                  <h2 className="text-4xl font-black text-blue-300">Four Pillars</h2>

                  <div className="mt-8 grid grid-cols-2 gap-7 md:grid-cols-4">
                    {["year", "month", "day", "hour"].map((key) => {
                      const p = pillars[key]
                      return (
                        <div key={key} className="rounded-2xl border border-white/10 bg-black/70 p-8">
                          <p className="text-sm uppercase tracking-widest text-gray-500">{key}</p>
                          <p className="mt-5 text-6xl font-black text-yellow-100">
                            {p.stem.symbol}{p.branch.symbol}
                          </p>
                          <p className="mt-5 text-lg font-semibold text-gray-300">
                            {p.stem.element} / {p.branch.element}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="rounded-3xl border border-red-500/20 bg-black/45 p-8">
                  <h2 className="text-4xl font-black text-red-300">Five Energy Ratio</h2>

                  <div className="mt-8 space-y-5">
                    {Object.entries(five).map(([name, value]: any) => (
                      <div key={name}>
                        <div className="flex justify-between text-lg font-bold">
                          <span>{name}</span>
                          <span>{value}%</span>
                        </div>
                        <div className="mt-2 h-5 rounded-full bg-white/10">
                          <div
                            className={`h-5 rounded-full ${energyColor[name] || "bg-blue-500"}`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-yellow-500/30 bg-black/60 p-8">
                  <h2 className="text-4xl font-black text-yellow-300">
                    Unlock Full K-UPFATE Report
                  </h2>

                  <p className="mt-4 text-lg leading-8 text-gray-300">
                    The free scan reveals only the surface structure. Choose a premium tier to unlock deeper interpretation.
                  </p>

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
                            : "border-white/10 bg-black/60 hover:border-yellow-300/40"
                        ].join(" ")}
                      >
                        <p className="text-lg font-black tracking-widest text-yellow-100">{plan.name}</p>
                        <p className="mt-3 text-3xl font-black text-yellow-300">{plan.price}</p>
                        <p className="mt-4 text-sm leading-6 text-gray-300">{plan.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-black/70 p-7">
                    <h3 className="text-2xl font-black text-yellow-200">
                      {paidPlan === selectedPlan ? `${selectedPlan.toUpperCase()} Report Unlocked` : `${selectedPlan.toUpperCase()} Locked Preview`}
                    </h3>

                    {paidPlan === selectedPlan ? (
                      <PremiumReportView result={result} plan={selectedPlan} />
                    ) : (
                      <>
                        <div className="mt-5 rounded-2xl border border-yellow-300/20 bg-black/70 p-6 text-lg leading-9 text-gray-300">
                          <p className="font-black text-yellow-200">Locked Premium Sections</p>
                          <ul className="mt-4 list-disc space-y-2 pl-6">
                            <li>Career direction and work pattern</li>
                            <li>Wealth and money flow tendency</li>
                            <li>Relationship and partner dynamics</li>
                            <li>Health imbalance signal</li>
                            <li>Hidden risk and correction strategy</li>
                            <li>Useful Energy deep interpretation</li>
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
                  className="w-fit rounded-2xl border border-yellow-400/40 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 px-10 py-5 text-lg font-black tracking-widest text-black shadow-[0_0_40px_rgba(255,215,0,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,215,0,0.55)]"
                >
                  ✦ RE-ENTER DESTINY DATA
                </button>
              </div>
            </section>
          )}

          <footer className="mt-20 border-t border-white/10 py-10 text-center text-sm text-zinc-400">
            <div className="flex justify-center gap-6">
              <a href="/privacy" className="hover:text-white">Privacy Policy</a>
              <a href="/terms" className="hover:text-white">Terms of Service</a>
              <a href="/refund" className="hover:text-white">Refund Policy</a>
              <a href="/contact" className="hover:text-white">Contact</a>
            </div>
            <p className="mt-4">© K-UPFATE. Ancient Korean sky wisdom for modern life.</p>
          </footer>
        </div>
      </section>
    </main>
  )
}
