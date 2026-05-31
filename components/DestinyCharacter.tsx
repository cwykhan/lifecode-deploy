"use client"

const characterMap: Record<string, any> = {
  Tree: {
    name: "Forest Explorer",
    strength: "Growth, vision, movement",
    weakness: "Overextension and impatience",
    correction: "Metal discipline"
  },
  Fire: {
    name: "Flame Warrior",
    strength: "Charisma, passion, visibility",
    weakness: "Burnout and impulsive action",
    correction: "Water strategy"
  },
  Earth: {
    name: "Mountain Strategist",
    strength: "Stability, endurance, responsibility",
    weakness: "Stagnation and overthinking",
    correction: "Tree growth"
  },
  Metal: {
    name: "Silver General",
    strength: "Precision, discipline, judgment",
    weakness: "Rigidity and isolation",
    correction: "Fire expression"
  },
  Water: {
    name: "Ocean Sage",
    strength: "Wisdom, adaptability, hidden strategy",
    weakness: "Hesitation and emotional distance",
    correction: "Earth grounding"
  }
}

export default function DestinyCharacter({ result }: { result: any }) {
  const energy = result?.strength?.dominantEnergy || "Earth"
  const c = characterMap[energy] || characterMap.Earth

  return (
    <div className="rounded-3xl border border-red-400/30 bg-black/60 p-8 shadow-[0_0_50px_rgba(255,80,80,0.12)]">
      <p className="text-sm uppercase tracking-[0.45em] text-red-300">
        Destiny Character
      </p>

      <h2 className="mt-5 text-5xl font-black text-yellow-100">
        The {c.name}
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
          <p className="text-gray-400">Strength</p>
          <p className="mt-2 font-bold text-white">{c.strength}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
          <p className="text-gray-400">Weakness</p>
          <p className="mt-2 font-bold text-red-200">{c.weakness}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
          <p className="text-gray-400">Correction</p>
          <p className="mt-2 font-bold text-blue-200">{c.correction}</p>
        </div>
      </div>
    </div>
  )
}
