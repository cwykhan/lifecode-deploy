"use client"
import Txt from "@/components/TranslatedText"
import Bi from "@/components/BilingualText"

const planetMap: Record<string, any> = {
  Tree: { planet: "Jupiter", aura: "Blue Jupiter Aura" },
  Fire: { planet: "Mars", aura: "Red Mars Aura" },
  Earth: { planet: "Earth", aura: "Golden Earth Aura" },
  Metal: { planet: "Venus", aura: "Silver Venus Aura" },
  Water: { planet: "Mercury", aura: "Dark Mercury Aura" }
}

export default function CosmicIdentity({ result }: { result: any }) {
  const ratio = result?.fiveEnergy?.ratio || {}
  const dominant = result?.strength?.dominantEnergy || "Earth"
  const useful = result?.usefulEnergy || "Tree"

  const dominantPlanet = planetMap[dominant] || planetMap.Earth
  const usefulPlanet = planetMap[useful] || planetMap.Tree

  const values = Object.values(ratio).map(Number)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const spread = max - min

  const soulAge =
    spread >= 45 ? "Ancient Soul" :
    spread >= 28 ? "Mature Soul" :
    "Balanced Soul"

  const planetInfluence = [
    ["Jupiter", ratio.Tree || 0],
    ["Mars", ratio.Fire || 0],
    ["Earth", ratio.Earth || 0],
    ["Venus", ratio.Metal || 0],
    ["Mercury", ratio.Water || 0]
  ]

  return (
    <div className="rounded-3xl border border-yellow-400/30 bg-white p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.45em] text-[#725b38]"><Bi en="Cosmic Identity" ko="나의 기운과 상징" /></p>

      <h2 className="mt-5 text-5xl font-black text-[#725b38]">
        <Txt text={dominantPlanet.aura} />
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[#e5dfea] bg-white p-6">
          <p className="text-[#6d6675]"><Bi en="Dominant Planet" ko="두드러진 행성 상징" /></p>
          <p className="mt-3 text-3xl font-black text-[#373341]">
            <Txt text={dominantPlanet.planet} />
          </p>
        </div>

        <div className="rounded-2xl border border-[#e5dfea] bg-white p-6">
          <p className="text-[#6d6675]"><Bi en="Lucky Planet" ko="도움이 되는 행성 상징" /></p>
          <p className="mt-3 text-3xl font-black text-[#516d88]">
            <Txt text={usefulPlanet.planet} />
          </p>
        </div>

        <div className="rounded-2xl border border-[#e5dfea] bg-white p-6">
          <p className="text-[#6d6675]"><Bi en="Soul Age" ko="영혼의 성숙 유형" /></p>
          <p className="mt-3 text-3xl font-black text-[#986366]">
            <Txt text={soulAge} />
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-black text-[#725b38]"><Bi en="Planet Influence" ko="행성별 기운 비율" /></h3>

        <div className="mt-5 space-y-4">
          {planetInfluence.map(([name, value]: any) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}
