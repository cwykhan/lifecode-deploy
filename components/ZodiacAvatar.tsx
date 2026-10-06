"use client"
import {ko} from "@/lib/korean"
import Txt from "@/components/TranslatedText"
import Bi from "@/components/BilingualText"

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
    <div className="rounded-3xl border border-yellow-400/30 bg-white p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.45em] text-[#986366]"><Bi en="Zodiac Avatar" ko="나의 띠 상징" /></p>

      <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center">
        <div className="relative grid shrink-0 h-52 w-52 place-items-center rounded-full border border-yellow-300/40 bg-[#eee7f5] text-8xl shadow-sm">
          <div className="absolute inset-3 rounded-full border border-yellow-200/20" />
          <div className="absolute inset-8 rounded-full border border-red-300/10" />
          <span className="drop-shadow-[0_0_25px_rgba(255,215,120,0.6)]">
            {animal.icon}
          </span>
        </div>

        <div>
          <h2 className="text-5xl font-black text-[#725b38]">
            <Txt text={title} />
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#373341]">
            <Bi en={`Your year pillar manifests as the ${title}. This avatar represents the outer destiny signature visible to the world.`} ko={`년주는 ${ko(title)}의 상징으로 표현됩니다. 세상에 드러나는 나의 바깥 성향을 나타냅니다.`} />
          </p>

          <p className="mt-4 text-[#725b38]">
            <Bi en={`${pillar?.stem?.element} sky energy fused with ${pillar?.branch?.element} earth energy.`} ko={`천간의 ${ko(pillar?.stem?.element || "")} 기운과 지지의 ${ko(pillar?.branch?.element || "")} 기운이 만납니다.`} />
          </p>
        </div>
      {familyRoot && (
          <div className="mt-5 rounded-2xl border border-yellow-300/20 bg-[#faf3e6] p-5">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#725b38]"><Bi en="Family Root Signal" ko="가족과 뿌리의 기운" /></p>
            <h3 className="mt-3 text-2xl font-black text-[#725b38]">
              <Txt text={familyRoot.title} />
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#6d6675]">
              <Txt text={familyRoot.summary} />
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
