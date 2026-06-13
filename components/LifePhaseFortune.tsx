"use client"

export default function LifePhaseFortune({ result }: { result:any }) {
  const dominant = result?.strength?.dominantEnergy || "Earth"
  const useful = result?.usefulEnergy || "Metal"

  const phases = [
    {
      title: "Early Life",
      age: "0 - 19",
      score: 58,
      theme: "Foundation and Family Imprint",
      text: `This period forms your basic emotional pattern, family memory, learning attitude, and early confidence. When ${dominant} Energy is strong, early life may feel shaped by repeated family atmosphere and environmental pressure.`,
      career: "Career is not yet visible, but early interests, talents, and repeated habits begin to form.",
      wealth: "Money awareness usually comes through family environment rather than personal control.",
      caution: "Avoid carrying childhood limitations into adult decisions."
    },
    {
      title: "Youth Fortune",
      age: "20 - 34",
      score: 66,
      theme: "Identity, Direction, and First Expansion",
      text: `This is the period where your identity begins to separate from family influence. ${dominant} Energy becomes more visible through work, love, ambition, and social choices.`,
      career: "Career direction begins to form. Trial and error are important, but scattered choices can delay growth.",
      wealth: "Money may fluctuate because experience is still being built. Skill accumulation matters more than quick gain.",
      caution: `Use ${useful} Energy to correct impulsive or repetitive decisions.`
    },
    {
      title: "Middle Life",
      age: "35 - 49",
      score: 78,
      theme: "Achievement, Responsibility, and Wealth Formation",
      text: `This is the main achievement period. Your accumulated skill, reputation, and decision pattern begin to produce visible results. If ${useful} Energy is used correctly, this phase can become a wealth-building period.`,
      career: "Career authority increases. Leadership, technical expertise, management, or independent business may become important.",
      wealth: "This is a key asset-building phase. Long-term accumulation is favored over emotional speculation.",
      caution: "Do not repeat old strategies just because they once worked."
    },
    {
      title: "Mature Life",
      age: "50 - 64",
      score: 84,
      theme: "Influence, Strategy, and Consolidation",
      text: `This period converts experience into influence. ${dominant} Energy becomes more refined, and your life direction becomes clearer when supported by ${useful} Energy.`,
      career: "Consulting, leadership, teaching, advisory roles, or strategic work become more suitable.",
      wealth: "Wealth preservation becomes as important as wealth creation. Protecting accumulated value matters.",
      caution: "Avoid over-expansion without structure."
    },
    {
      title: "Later Life",
      age: "65+",
      score: 72,
      theme: "Legacy, Wisdom, and Spiritual Direction",
      text: `This period is about legacy. The question is no longer only what you achieve, but what remains through your knowledge, family, reputation, and influence.`,
      career: "Formal career may reduce, but advisory influence, writing, teaching, or mentoring can remain strong.",
      wealth: "Stable management and inheritance planning become more important than risk-taking.",
      caution: "Do not isolate your wisdom. Share it with the right people."
    }
  ]

  return (
    <div className="rounded-3xl border border-emerald-300/20 bg-black/70 p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-200">
        Life Phase Fortune Map
      </p>

      <h3 className="mt-4 text-4xl font-black text-emerald-100">
        Early · Youth · Middle · Mature · Later Life
      </h3>

      <div className="mt-8 space-y-6">
        {phases.map((p) => (
          <div key={p.title} className="rounded-2xl border border-white/10 bg-black/60 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-2xl font-black text-emerald-100">{p.title}</p>
                <p className="mt-1 text-sm text-gray-400">Age {p.age}</p>
                <p className="mt-2 text-lg font-bold text-yellow-200">{p.theme}</p>
              </div>

              <p className="text-4xl font-black text-yellow-200">{p.score}</p>
            </div>

            <div className="mt-4 h-4 rounded-full bg-white/10">
              <div className="h-4 rounded-full bg-emerald-300" style={{ width: `${p.score}%` }} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/50 p-4">
                <p className="font-black text-emerald-200">Life Meaning</p>
                <p className="mt-2 text-sm leading-7 text-gray-300">{p.text}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/50 p-4">
                <p className="font-black text-emerald-200">Career Flow</p>
                <p className="mt-2 text-sm leading-7 text-gray-300">{p.career}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/50 p-4">
                <p className="font-black text-emerald-200">Wealth Flow</p>
                <p className="mt-2 text-sm leading-7 text-gray-300">{p.wealth}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/50 p-4">
                <p className="font-black text-red-200">Caution</p>
                <p className="mt-2 text-sm leading-7 text-gray-300">{p.caution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
