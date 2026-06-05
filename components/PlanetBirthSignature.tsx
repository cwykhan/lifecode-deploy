"use client"

const stemPlanet: Record<string, any> = {
  T: { planet: "Jupiter", image: "/images/planet-jupiter.png", energy: "Tree", polarity: "Sunlit", tone: "Expansion, growth, vision, and movement" },
  t: { planet: "Jupiter", image: "/images/planet-jupiter.png", energy: "Tree", polarity: "Moonlit", tone: "Adaptation, learning, inner growth, and flexibility" },

  F: { planet: "Mars", image: "/images/planet-mars.png", energy: "Fire", polarity: "Sunlit", tone: "Passion, action, visibility, and direct power" },
  f: { planet: "Mars", image: "/images/planet-mars.png", energy: "Fire", polarity: "Moonlit", tone: "Inner flame, sensitivity, warmth, and hidden intensity" },

  E: { planet: "Earth", image: "/images/planet-earth.png", energy: "Earth", polarity: "Sunlit", tone: "Stability, structure, responsibility, and gravity" },
  e: { planet: "Earth", image: "/images/planet-earth.png", energy: "Earth", polarity: "Moonlit", tone: "Nurturing ground, storage, patience, and silent strength" },

  M: { planet: "Venus", image: "/images/planet-venus.png", energy: "Metal", polarity: "Sunlit", tone: "Judgment, precision, discipline, and refinement" },
  m: { planet: "Venus", image: "/images/planet-venus.png", energy: "Metal", polarity: "Moonlit", tone: "Beauty, elegance, internal order, and selective clarity" },

  W: { planet: "Mercury", image: "/images/planet-mercury.png", energy: "Water", polarity: "Sunlit", tone: "Movement, intelligence, flow, and strategy" },
  w: { planet: "Mercury", image: "/images/planet-mercury.png", energy: "Water", polarity: "Moonlit", tone: "Depth, memory, intuition, and hidden knowledge" }
}

const seasonalEarthByBranchIndex: Record<number, any> = {
  4: { name: "Spring Earth", field: "Dragon Field", polarity: "Sunlit", image: "/images/earth-spring.png", desc: "Earth opening after winter, carrying the pressure of spring growth." },
  7: { name: "Summer Earth", field: "Goat Field", polarity: "Moonlit", image: "/images/earth-summer.png", desc: "Heated Earth, fertile, emotional, and internally dense." },
  10: { name: "Autumn Earth", field: "Dog Field", polarity: "Sunlit", image: "/images/earth-autumn.png", desc: "Earth after harvest, carrying judgment, storage, and transition." },
  1: { name: "Winter Earth", field: "Ox Field", polarity: "Moonlit", image: "/images/earth-winter.png", desc: "Frozen Earth, quiet, hidden, and deeply stored." }
}

export default function PlanetBirthSignature({ pillars }: { pillars: any }) {
  const dayStem = pillars?.day?.stem?.symbol || "E"
  const dayBranchIndex = pillars?.day?.branch?.index
  const p = stemPlanet[dayStem] || stemPlanet.E
  const seasonalEarth = seasonalEarthByBranchIndex[dayBranchIndex]

  return (
    <div className="rounded-3xl border border-yellow-400/30 bg-black/70 p-8 shadow-[0_0_80px_rgba(255,215,120,0.16)]">
      <p className="text-sm uppercase tracking-[0.45em] text-yellow-300">
        Planet Birth Signature
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-[300px_1fr] md:items-center">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black p-5">
          <img
            src={p.image}
            alt={p.planet}
            className="h-72 w-full rounded-2xl object-contain"
          />
        </div>

        <div>
          <h2 className="text-5xl font-black text-yellow-100">
            {p.polarity} {p.planet}
          </h2>

          <p className="mt-4 text-2xl font-black text-blue-200">
            {p.polarity} {p.energy} Energy
          </p>

          <p className="mt-5 text-xl leading-9 text-gray-200">
            Your Day Sky Energy is <span className="font-black text-yellow-200">{dayStem}</span>.
            This means your core self was born under the {p.polarity.toLowerCase()} current of {p.planet}.
          </p>

          <p className="mt-4 text-lg leading-8 text-gray-300">
            In K-upfate, {p.planet} represents {p.energy} Energy:
            <span className="font-bold text-yellow-200"> {p.tone}</span>.
          </p>
        </div>
      </div>

      {seasonalEarth && (
        <div className="mt-8 rounded-3xl border border-yellow-300/20 bg-yellow-950/20 p-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-yellow-300">
              Seasonal Earth Field
            </p>

            <h3 className="mt-3 text-4xl font-black text-yellow-100">
              {seasonalEarth.name} · {seasonalEarth.field}
            </h3>

            <p className="mt-3 text-lg leading-8 text-gray-300">
              Your Day Earth Field carries {seasonalEarth.polarity} Earth.
              {seasonalEarth.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
