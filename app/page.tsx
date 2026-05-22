"use client"

import { useState } from "react"
import { generateReport } from "@/lib/reportText"
import { generateDestinyExperience } from "@/lib/destinyCode"
import PaddlePayButton from "@/components/PaddlePayButton"
import FiveEnergyRadar from "@/components/FiveEnergyRadar"
import ZodiacAvatar from "@/components/ZodiacAvatar"

const plans = [
  { id: "commons", name: "BRONZE", price: "$5", desc: "Basic signal scan and locked hidden pattern." },
  { id: "merchants", name: "SILVER", price: "$15", desc: "Career, balance, and Useful Energy guidance." },
  { id: "nobility", name: "GOLD", price: "$30", desc: "Career, wealth, relationship, and health report." },
  { id: "emperor", name: "PLATINUM", price: "$50", desc: "Premium complete strategic LifeCode report." }
]

const energyColor: Record<string, string> = {
  Tree: "bg-blue-500",
  Fire: "bg-red-500",
  Earth: "bg-yellow-400",
  Metal: "bg-zinc-300",
  Water: "bg-neutral-950"
}

export default function Home() {
  const [birthDate, setBirthDate] = useState("1976-11-11")
  const [birthTime, setBirthTime] = useState("14:30")
  const [selectedPlan, setSelectedPlan] = useState("commons")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

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
        body: JSON.stringify({ year, month, day, hour, minute, plan: selectedPlan })
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(JSON.stringify(data, null, 2))
        return
      }

      setResult(data)
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
  const report = result ? generateReport(result, selectedPlan) : ""
  const destiny = result ? generateDestinyExperience(result) : null

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

              <h1 className="mt-5 text-7xl font-black tracking-tight text-yellow-100 drop-shadow-[0_0_20px_rgba(255,230,160,0.25)]">
                LifeCode AI
              </h1>

              <p className="mt-6 max-w-3xl text-2xl font-semibold leading-10 text-white">
                The stars were already aligned before your first breath.
              </p>

              <section className="mt-10 rounded-3xl border border-yellow-300/15 bg-black/60 p-8 backdrop-blur-xl">
                <h2 className="text-2xl font-black text-yellow-100">
                  Birth Information
                </h2>

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
                </div>
              </section>

              <section className="mt-8 rounded-3xl border border-yellow-300/15 bg-black/60 p-8 backdrop-blur-xl">
                <h2 className="text-2xl font-black text-red-200">
                  Choose Your Rank
                </h2>

                <div className="mt-8 grid gap-5 md:grid-cols-4">
                  {plans.map((plan) => (
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
                      <p className="text-lg font-black tracking-widest text-yellow-100">
                        {plan.name}
                      </p>
                      <p className="mt-3 text-3xl font-black text-yellow-300">
                        {plan.price}
                      </p>
                      <p className="mt-4 text-sm leading-6 text-gray-300">
                        {plan.desc}
                      </p>
                    </button>
                  ))}
                </div>

                <button
                  onClick={decode}
                  className="mt-8 rounded-none bg-red-600 px-12 py-5 text-xl font-black tracking-wide text-white transition hover:bg-red-500"
                >
                  {loading ? "DECODING..." : "Korean Ancient Code"}
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
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.55em] text-red-200">
                      Destiny Signal Detected
                    </p>

                    <h1 className="mt-4 text-6xl font-black tracking-tight text-yellow-100">
                      {destiny.rarity}
                    </h1>
                  </div>

                  <button className="bg-red-600 px-12 py-5 text-2xl font-black text-white">
                    Korean Ancient Code
                  </button>
                </div>

                <div className="mt-8 rounded-2xl border border-yellow-300/20 bg-black/70 p-7">
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                    LIFE CODE
                  </p>
                  <p className="mt-3 text-5xl font-black tracking-wide text-yellow-300">
                    {destiny.lifeCode}
                  </p>
                </div>

                <p className="mt-8 max-w-5xl text-2xl font-semibold leading-10 text-gray-100">
                  {destiny.rarityText}
                </p>

                <p className="mt-5 max-w-5xl text-2xl font-semibold leading-10 text-red-100">
                  {destiny.hook}
                </p>
              </div>

              <div className="bg-[#242424]/95 p-8">
                <h2 className="text-4xl font-black text-blue-300">
                  Four Pillars
                </h2>

                <div className="mt-8 grid grid-cols-2 gap-7 md:grid-cols-4">
                  {["year", "month", "day", "hour"].map((key) => {
                    const p = pillars[key]
                    return (
                      <div
                        key={key}
                        className="rounded-2xl border border-white/10 bg-black/70 p-8"
                      >
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                          {key}
                        </p>
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

              <div className="grid gap-8 bg-[#242424]/95 p-8">

                <ZodiacAvatar pillar={pillars.year} />


                <FiveEnergyRadar
                  data={[
                    { energy: "Tree", value: five.Tree || 0 },
                    { energy: "Fire", value: five.Fire || 0 },
                    { energy: "Earth", value: five.Earth || 0 },
                    { energy: "Metal", value: five.Metal || 0 },
                    { energy: "Water", value: five.Water || 0 }
                  ]}
                />

                <div className="rounded-3xl border border-red-500/20 bg-black/45 p-8">
                  <h2 className="text-4xl font-black text-red-300">
                    Five Energy Ratio
                  </h2>

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

                <div className="rounded-3xl border border-purple-500/20 bg-black/45 p-8">
                  <h2 className="text-4xl font-black text-purple-300">
                    Core Reading
                  </h2>

                  <div className="mt-8 grid gap-5 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
                      <p className="text-gray-400">Strength</p>
                      <p className="mt-4 text-4xl font-black text-yellow-100">
                        {result.strength?.level}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
                      <p className="text-gray-400">Dominant Energy</p>
                      <p className="mt-4 text-4xl font-black text-red-200">
                        {result.strength?.dominantEnergy}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-red-100">
                        {destiny.dangerText}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
                      <p className="text-gray-400">Useful Energy</p>
                      <p className="mt-4 text-4xl font-black text-blue-200">
                        {result.usefulEnergy}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-blue-100">
                        {destiny.usefulText}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedPlan === "commons" ? (
                  <div className="rounded-3xl border border-yellow-500/20 bg-black/50 p-8">
                    <h2 className="text-4xl font-black text-yellow-300">
                      Hidden Pattern Locked
                    </h2>

                    <div className="mt-6 whitespace-pre-line rounded-2xl border border-white/10 bg-black/70 p-7 text-xl leading-10 text-gray-200">
                      {destiny.lockedMessage}
                    </div>

                    <PaddlePayButton plan="merchants" />
                  </div>
                ) : (
                  <div className="rounded-3xl border border-yellow-500/20 bg-black/45 p-8">
                    <h2 className="text-4xl font-black text-yellow-300">
                      {selectedPlan.toUpperCase()} LifeCode Report
                    </h2>

                    <div className="mt-6 whitespace-pre-line rounded-2xl border border-white/10 bg-black/65 p-7 text-xl leading-10 text-gray-200">
                      {report}
                    </div>
                  </div>
                )}

                <button
                  onClick={reset}
                  className="w-fit rounded-xl border border-white/20 bg-black/70 px-5 py-3 text-sm font-bold"
                >
                  
<span className="relative z-10 flex items-center gap-3">
  ✦ RE-ENTER DESTINY DATA
</span>

                </button>
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  )
}
