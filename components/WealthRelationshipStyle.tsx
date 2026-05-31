"use client"

const wealthMap: Record<string, any> = {
  Tree: ["Builder", "You create value through growth, ideas, education, and long-term development."],
  Fire: ["Promoter", "You create value through visibility, influence, branding, and fast movement."],
  Earth: ["Accumulator", "You create value slowly through stability, assets, systems, and responsibility."],
  Metal: ["Executor", "You create value through precision, discipline, quality, and decisive action."],
  Water: ["Strategist", "You create value through information, timing, adaptation, and hidden movement."]
}

const relationshipMap: Record<string, any> = {
  Tree: ["Explorer", "You need growth, movement, and shared direction in relationships."],
  Fire: ["Magnet", "You attract through warmth, passion, expression, and emotional presence."],
  Earth: ["Guardian", "You love through loyalty, protection, support, and consistency."],
  Metal: ["Commander", "You need respect, clarity, boundaries, and trust in relationships."],
  Water: ["Observer", "You connect deeply, quietly, and selectively through emotional depth."]
}

export default function WealthRelationshipStyle({ result }: { result: any }) {
  const energy = result?.strength?.dominantEnergy || "Earth"
  const wealth = wealthMap[energy] || wealthMap.Earth
  const relationship = relationshipMap[energy] || relationshipMap.Earth

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-yellow-400/30 bg-black/60 p-8">
        <p className="text-sm uppercase tracking-[0.4em] text-yellow-300">
          Wealth Style
        </p>
        <h2 className="mt-5 text-4xl font-black text-yellow-100">
          {wealth[0]}
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-300">
          {wealth[1]}
        </p>
      </div>

      <div className="rounded-3xl border border-blue-400/30 bg-black/60 p-8">
        <p className="text-sm uppercase tracking-[0.4em] text-blue-300">
          Relationship Style
        </p>
        <h2 className="mt-5 text-4xl font-black text-blue-100">
          {relationship[0]}
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-300">
          {relationship[1]}
        </p>
      </div>
    </div>
  )
}
