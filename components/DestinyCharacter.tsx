"use client"
import Txt from "@/components/TranslatedText"
import Bi from "@/components/BilingualText"

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
    <div className="rounded-3xl border border-red-400/30 bg-white p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.45em] text-[#986366]"><Bi en="Destiny Character" ko="나의 성향 유형" /></p>

      <h2 className="mt-5 text-5xl font-black text-[#725b38]">
        <Txt text={c.name} />
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#e5dfea] bg-white p-5">
          <p className="text-[#6d6675]"><Bi en="Strength" ko="강점" /></p>
          <p className="mt-2 font-bold text-[#373341]"><Txt text={c.strength} /></p>
        </div>

        <div className="rounded-2xl border border-[#e5dfea] bg-white p-5">
          <p className="text-[#6d6675]"><Bi en="Weakness" ko="주의할 성향" /></p>
          <p className="mt-2 font-bold text-[#986366]"><Txt text={c.weakness} /></p>
        </div>

        <div className="rounded-2xl border border-[#e5dfea] bg-white p-5">
          <p className="text-[#6d6675]"><Bi en="Correction" ko="균형을 위한 방향" /></p>
          <p className="mt-2 font-bold text-[#516d88]"><Txt text={c.correction} /></p>
        </div>
      </div>
    </div>
  )
}
