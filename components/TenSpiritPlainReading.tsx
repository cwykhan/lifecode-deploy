"use client"

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
    <div className="rounded-3xl border border-blue-300/20 bg-black/70 p-8 shadow-[0_0_70px_rgba(120,180,255,0.12)]">
      <p className="text-sm uppercase tracking-[0.45em] text-blue-200">
        Human Pattern Reading
      </p>

      <h2 className="mt-5 text-4xl font-black text-blue-100">
        What your hidden field says about you
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {picked.map((item: any, idx: number) => (
          <div key={idx} className="rounded-2xl border border-white/10 bg-black/70 p-6">
            <p className="text-xs font-black uppercase tracking-widest text-yellow-300">
              {item.type}
            </p>
            <h3 className="mt-3 text-2xl font-black text-yellow-100">
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-gray-300">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
