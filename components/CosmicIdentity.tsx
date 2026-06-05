"use client"

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
    <div className="rounded-3xl border border-yellow-400/30 bg-black/70 p-8 shadow-[0_0_80px_rgba(255,215,120,0.16)]">
      <p className="text-sm uppercase tracking-[0.45em] text-yellow-300">
        Cosmic Identity
      </p>

      <h2 className="mt-5 text-5xl font-black text-yellow-100">
        {dominantPlanet.aura}
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
          <p className="text-gray-400">Dominant Planet</p>
          <p className="mt-3 text-3xl font-black text-white">
            {dominantPlanet.planet}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
          <p className="text-gray-400">Lucky Planet</p>
          <p className="mt-3 text-3xl font-black text-blue-200">
            {usefulPlanet.planet}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
          <p className="text-gray-400">Soul Age</p>
          <p className="mt-3 text-3xl font-black text-red-200">
            {soulAge}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-black text-yellow-200">
          Planet Influence
        </h3>

        <div className="mt-5 space-y-4">
          {planetInfluence.map(([name, value]: any) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}
