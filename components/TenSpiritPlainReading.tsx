"use client"
import Txt from "@/components/TranslatedText"
import Bi from "@/components/BilingualText"

import { getDayBranchSpiritProfile } from "@/lib/tenSpirits"

const styleMap: Record<string, any> = {
  bm: {
    title: "Opportunity Hunter",
    type: "Wealth Instinct",
    text: "You naturally notice money chances, investments, business openings, and practical advantages."
  },
  rm: {
    title: "Steady Wealth Builder",
    type: "Wealth Instinct",
    text: "You prefer stable income, realistic planning, predictable resources, and long-term accumulation."
  },
  bs: {
    title: "Intuitive Learner",
    type: "Learning Style",
    text: "You learn through patterns, shortcuts, private study, and unusual insight rather than strict methods."
  },
  rs: {
    title: "Structured Learner",
    type: "Learning Style",
    text: "You learn well through education, tradition, guidance, books, mentors, and organized knowledge."
  },
  es: {
    title: "Social Independent",
    type: "Friendship Style",
    text: "You enjoy friends and peers, but you also need independence and dislike being controlled."
  },
  tm: {
    title: "Competitive Networker",
    type: "Friendship Style",
    text: "You build relationships through competition, shared goals, survival instinct, and strong peer energy."
  },
  th: {
    title: "Unconventional Speaker",
    type: "Expression Style",
    text: "You challenge rules, speak sharply, and prefer direct expression over polite conformity."
  },
  fg: {
    title: "Natural Producer",
    type: "Talent Style",
    text: "You express talent through skill, output, comfort, creativity, and practical production."
  },
  rh: {
    title: "Order Builder",
    type: "Social Style",
    text: "You respect order, reputation, responsibility, and social trust."
  },
  bh: {
    title: "Pressure Fighter",
    type: "Survival Style",
    text: "You respond strongly under pressure and can grow through discipline, crisis, and challenge."
  }
}

export default function TenSpiritPlainReading({ result }: { result: any }) {
  const spirits = getDayBranchSpiritProfile(result)
  const picked = spirits.map((s: any) => styleMap[s.code]).filter(Boolean)

  if (!picked.length) return null

  return (
    <div className="rounded-3xl border border-blue-300/20 bg-white p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.45em] text-[#516d88]"><Bi en="Human Pattern Reading" ko="내면의 행동 성향" /></p>

      <h2 className="mt-5 text-4xl font-black text-[#516d88]"><Bi en="What your hidden field says about you" ko="지장간으로 알아보는 나의 성향" /></h2>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {picked.map((item: any, idx: number) => (
          <div key={idx} className="rounded-2xl border border-[#e5dfea] bg-white p-6">
            <p className="text-xs font-black uppercase tracking-widest text-[#725b38]">
              <Txt text={item.type} />
            </p>
            <h3 className="mt-3 text-2xl font-black text-[#725b38]">
              <Txt text={item.title} />
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#6d6675]">
              <Txt text={item.text} />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
