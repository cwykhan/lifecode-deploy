"use client"

const animalByIndex: Record<number, { name: string; icon: string }> = {
  0: { name: "Rat", icon: "🐀" },
  1: { name: "Ox", icon: "🐂" },
  2: { name: "Tiger", icon: "🐅" },
  3: { name: "Rabbit", icon: "🐇" },
  4: { name: "Dragon", icon: "🐉" },
  5: { name: "Snake", icon: "🐍" },
  6: { name: "Horse", icon: "🐎" },
  7: { name: "Goat", icon: "🐐" },
  8: { name: "Monkey", icon: "🐒" },
  9: { name: "Rooster", icon: "🐓" },
  10: { name: "Dog", icon: "🐕" },
  11: { name: "Pig", icon: "🐖" }
}

const colorMap: Record<string, string> = {
  Tree: "Blue",
  Fire: "Red",
  Earth: "Golden",
  Metal: "Silver",
  Water: "Black"
}

import { getFamilyRootSignal } from "@/lib/tenSpirits"

export default function ZodiacAvatar({ pillar, result }: { pillar: any; result?: any }) {
  const branchIndex = pillar?.branch?.index ?? 0
  const animal = animalByIndex[branchIndex] || animalByIndex[0]
  const color = colorMap[pillar?.stem?.element] || "Cosmic"
  const title = `${color} ${animal.name}`

  const familyRoot = result ? getFamilyRootSignal(result) : null

  return (
    <div className="rounded-3xl border border-yellow-400/30 bg-black/60 p-8 shadow-[0_0_60px_rgba(255,215,120,0.16)]">
      <p className="text-sm uppercase tracking-[0.45em] text-red-200">
        Zodiac Avatar
      </p>

      <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center">
        <div className="relative grid h-52 w-52 place-items-center rounded-full border border-yellow-300/40 bg-[radial-gradient(circle,rgba(255,215,120,0.28),rgba(120,20,20,0.18),rgba(0,0,0,0.9))] text-8xl shadow-[0_0_80px_rgba(255,215,120,0.25)]">
          <div className="absolute inset-3 rounded-full border border-yellow-200/20" />
          <div className="absolute inset-8 rounded-full border border-red-300/10" />
          <span className="drop-shadow-[0_0_25px_rgba(255,215,120,0.6)]">
            {animal.icon}
          </span>
        </div>

        <div>
          <h2 className="text-5xl font-black text-yellow-100">
            {title}
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-200">
            Your year pillar manifests as the {title}. This avatar represents
            the outer destiny signature visible to the world.
          </p>

          <p className="mt-4 text-yellow-300">
            {pillar?.stem?.element} sky energy fused with {pillar?.branch?.element} earth energy.
          </p>
        </div>
      {familyRoot && (
          <div className="mt-5 rounded-2xl border border-yellow-300/20 bg-yellow-950/20 p-5">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
              Family Root Signal
            </p>
            <h3 className="mt-3 text-2xl font-black text-yellow-100">
              {familyRoot.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              {familyRoot.summary}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
