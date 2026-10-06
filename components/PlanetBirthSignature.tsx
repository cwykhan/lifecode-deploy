"use client"
import {ko} from "@/lib/korean"
import Bi from "@/components/BilingualText"

import { getDayBranchSpiritProfile } from "@/lib/tenSpirits"

const spiritKo:Record<string,[string,string]> = {"es": ["비견 · 比肩", "자기 주도성, 독립심, 의지와 뚜렷한 정체성"], "tm": ["겁재 · 劫財", "경쟁, 가족의 압력, 자원 갈등과 독립성"], "bm": ["편재 · 偏財", "기회, 사업 감각, 유연한 재물 흐름과 실용적인 본능"], "rm": ["정재 · 正財", "안정적인 재물, 책임감, 현실적인 판단과 꾸준한 관리"], "bs": ["편인 · 偏印", "직관, 독특한 통찰, 독학과 비전통적인 학습"], "rs": ["정인 · 正印", "교육, 지지, 전통적인 지식과 체계적인 학습"], "fg": ["식신 · 食神", "재능, 창의적인 결과물, 편안함과 실질적인 생산"], "th": ["상관 · 傷官", "표현력, 비판 정신, 독립적인 발언과 규칙에 대한 도전"], "bh": ["편관 · 偏官", "압박, 절제, 도전과 위기에 대응하는 힘"], "rh": ["정관 · 正官", "질서, 책임감, 평판과 사회적 신뢰"]}

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

export default function PlanetBirthSignature({ pillars, result }: { pillars: any; result?: any }) {
  const dayStem = pillars?.day?.stem?.symbol || "E"
  const dayBranchIndex = pillars?.day?.branch?.index
  const p = stemPlanet[dayStem] || stemPlanet.E
  const seasonalEarth = seasonalEarthByBranchIndex[dayBranchIndex]
  const dayBranchSpirits = result ? getDayBranchSpiritProfile(result) : []

  return (
    <div className="rounded-3xl border border-yellow-400/30 bg-white p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.45em] text-[#725b38]"><Bi en="Planet Birth Signature" ko="탄생의 행성 상징" /></p>

      <div className="mt-8 grid gap-8 md:grid-cols-[300px_1fr] md:items-center">
        <div className="relative overflow-hidden rounded-3xl border border-[#e5dfea] bg-white p-5">
          <img
            src={p.image}
            alt={p.planet}
            className="h-72 w-full rounded-2xl object-contain"
          />
        </div>

        <div>
          <h2 className="text-5xl font-black text-[#725b38]">
            <Bi en={`${p.polarity} ${p.planet}`} ko={`${ko(p.polarity)} · ${ko(p.planet)}`} />
          </h2>

          <p className="mt-4 text-2xl font-black text-[#516d88]">
            <Bi en={`${p.polarity} ${p.energy} Energy`} ko={`${ko(p.polarity)} · ${ko(p.energy)}의 기운`} />
          </p>

          <p className="mt-5 text-xl leading-9 text-[#373341]">
            <Bi en={`Your Day Sky Energy is ${dayStem}. This means your core self was born under the ${p.polarity.toLowerCase()} current of ${p.planet}.`} ko={`일간 코드는 ${dayStem}입니다. 나의 중심 기운을 ${ko(p.polarity)}의 ${ko(p.planet)} 상징으로 살펴봅니다.`} />
          </p>

          <p className="mt-4 text-lg leading-8 text-[#6d6675]">
            <Bi en={`In K-UPFATE, ${p.planet} represents ${p.energy} Energy: ${p.tone}.`} ko={`K-UPFATE에서 ${ko(p.planet)}은 ${ko(p.energy)}의 상징입니다. ${ko(p.tone)}을 뜻합니다.`} />
          </p>
        </div>
      </div>

      {dayBranchSpirits.length > 0 && (
        <div className="mt-8 rounded-3xl border border-blue-300/20 bg-[#edf2f8] p-6">
          <p className="text-sm uppercase tracking-widest text-[#516d88]"><Bi en="Inner Character from Day Field" ko="일지로 살펴보는 내면 성향" /></p>

          <h3 className="mt-3 text-3xl font-black text-[#516d88]"><Bi en="Hidden Sky Energy converted into Ten Spirits" ko="지장간을 십성으로 풀어보기" /></h3>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {dayBranchSpirits.map((s: any) => (
              <div key={s.stem + s.code} className="rounded-2xl border border-[#e5dfea] bg-white p-4">
                <p className="text-sm font-black text-[#725b38]">
                  <Bi en={`${s.stem} · ${s.name}`} ko={spiritKo[s.code]?.[0]} />
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6d6675]">
                  <Bi en={s.meaning} ko={spiritKo[s.code]?.[1]} />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {seasonalEarth && (
        <div className="mt-8 rounded-3xl border border-yellow-300/20 bg-[#faf3e6] p-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-[#725b38]"><Bi en="Seasonal Earth Field" ko="계절에 따른 토의 기운" /></p>

            <h3 className="mt-3 text-4xl font-black text-[#725b38]">
              <Bi en={`${seasonalEarth.name} · ${seasonalEarth.field}`} ko={`${ko(seasonalEarth.name)} · ${ko(seasonalEarth.field)}`} />
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#6d6675]">
              <Bi en={`Your Day Earth Field carries ${seasonalEarth.polarity} Earth. ${seasonalEarth.desc}`} ko={`${ko(seasonalEarth.polarity)}의 토 기운입니다. ${{4:"겨울을 지나 성장의 힘을 품은 봄의 땅",7:"온기를 품고 비옥하며 내면이 풍부한 여름의 땅",10:"수확 후 저장과 전환을 준비하는 가을의 땅",1:"조용히 기운을 깊이 저장하는 겨울의 땅"}[dayBranchIndex as 4|7|10|1]}.`} />
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
