"use client"
import {ko} from "@/lib/korean"
import Txt from "@/components/TranslatedText"
import Bi from "@/components/BilingualText"

export default function LifePhaseFortune({ result }: { result:any }) {
  const dominant = result?.strength?.dominantEnergy || "Earth"
  const useful = result?.usefulEnergy || "Metal"

  const phases = [
    {
      title: "Early Life",
      age: "0 - 19",
      score: 58,
      themeKo: `기초와 가족의 영향`,
      textKo: `이 시기는 감정의 바탕, 가족에 대한 기억, 학습 태도와 초기 자신감을 형성합니다. ${ko(dominant)}의 기운이 강하면 가족 분위기와 환경의 압력이 반복적으로 영향을 줄 수 있습니다.`,
      careerKo: `직업이 뚜렷하지 않더라도 초기 관심, 재능과 반복되는 습관이 형성됩니다.`,
      wealthKo: `재물에 대한 인식은 개인의 통제보다 가족 환경에서 주로 형성됩니다.`,
      cautionKo: `어린 시절의 제약을 성인이 된 뒤의 판단까지 가져오지 않도록 돌아보세요.`,

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
      themeKo: `정체성, 방향과 첫 확장`,
      textKo: `가족의 영향에서 벗어나 자신의 정체성을 만들어가는 시기입니다. ${ko(dominant)}의 기운이 일, 사랑, 포부와 사회적 선택을 통해 드러납니다.`,
      careerKo: `직업 방향이 형성됩니다. 시행착오도 중요하지만 분산된 선택은 성장을 늦출 수 있습니다.`,
      wealthKo: `경험을 쌓는 과정에서 수입이 변동할 수 있습니다. 빠른 수익보다 기술 축적이 중요합니다.`,
      cautionKo: `${ko(useful)}의 기운을 활용해 충동적이거나 반복적인 판단을 돌아보세요.`,

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
      themeKo: `성취, 책임과 재물의 형성`,
      textKo: `축적한 기술, 평판과 판단 방식이 결과를 만들어가는 시기입니다. ${ko(useful)}의 기운을 활용하는 방향을 살펴보세요.`,
      careerKo: `직업적 역할이 커집니다. 리더십, 기술 전문성, 관리 또는 독립 사업이 중요해질 수 있습니다.`,
      wealthKo: `자산을 쌓는 주요 시기입니다. 감정적인 투기보다 장기적인 축적을 권합니다.`,
      cautionKo: `과거에 성공했다는 이유만으로 같은 전략을 반복하지 마세요.`,

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
      themeKo: `영향력, 전략과 기반 정리`,
      textKo: `경험을 영향력으로 바꾸는 시기입니다. ${ko(dominant)}의 기운이 정제되고 ${ko(useful)}의 기운을 통해 삶의 방향을 돌아봅니다.`,
      careerKo: `컨설팅, 리더십, 교육, 자문과 전략 업무를 살펴보세요.`,
      wealthKo: `재물을 만드는 것만큼 지키는 것도 중요합니다. 쌓아온 가치를 보호하세요.`,
      cautionKo: `기반 없이 지나치게 확장하지 않도록 유의하세요.`,

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
      themeKo: `유산, 지혜와 내면의 방향`,
      textKo: `이 시기는 남기는 가치에 주목합니다. 성취뿐 아니라 지식, 가족, 평판과 영향력을 통해 무엇이 남는지 생각해 보세요.`,
      careerKo: `공식적인 직업 활동이 줄더라도 자문, 글쓰기, 교육과 멘토링을 이어갈 수 있습니다.`,
      wealthKo: `위험을 감수하기보다 안정적인 관리와 상속 계획이 중요해집니다.`,
      cautionKo: `지혜를 혼자 간직하기보다 적절한 사람들과 나누세요.`,

      theme: "Legacy, Wisdom, and Spiritual Direction",
      text: `This period is about legacy. The question is no longer only what you achieve, but what remains through your knowledge, family, reputation, and influence.`,
      career: "Formal career may reduce, but advisory influence, writing, teaching, or mentoring can remain strong.",
      wealth: "Stable management and inheritance planning become more important than risk-taking.",
      caution: "Do not isolate your wisdom. Share it with the right people."
    }
  ]

  return (
    <div className="rounded-3xl border border-emerald-300/20 bg-white p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-[#4c7863]"><Bi en="Life Phase Fortune Map" ko="생애 시기별 흐름" /></p>

      <h3 className="mt-4 text-4xl font-black text-[#4c7863]"><Bi en="Early · Youth · Middle · Mature · Later Life" ko="초년 · 청년 · 중년 · 장년 · 노년" /></h3>

      <div className="mt-8 space-y-6">
        {phases.map((p) => (
          <div key={p.title} className="rounded-2xl border border-[#e5dfea] bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-2xl font-black text-[#4c7863]"><Txt text={p.title} /></p>
                <p className="mt-1 text-sm text-[#6d6675]">Age {p.age}</p>
                <p className="mt-2 text-lg font-bold text-[#725b38]"><Bi en={p.theme} ko={p.themeKo} /></p>
              </div>

              <p className="text-4xl font-black text-[#725b38]">{p.score}</p>
            </div>

            <div className="mt-4 h-4 rounded-full bg-white/10">
              <div className="h-4 rounded-full bg-emerald-300" style={{ width: `${p.score}%` }} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#e5dfea] bg-white p-4">
                <p className="font-black text-[#4c7863]"><Bi en="Life Meaning" ko="시기의 의미" /></p>
                <p className="mt-2 text-sm leading-7 text-[#6d6675]"><Bi en={p.text} ko={p.textKo} /></p>
              </div>

              <div className="rounded-xl border border-[#e5dfea] bg-white p-4">
                <p className="font-black text-[#4c7863]"><Bi en="Career Flow" ko="직업 흐름" /></p>
                <p className="mt-2 text-sm leading-7 text-[#6d6675]"><Bi en={p.career} ko={p.careerKo} /></p>
              </div>

              <div className="rounded-xl border border-[#e5dfea] bg-white p-4">
                <p className="font-black text-[#4c7863]"><Bi en="Wealth Flow" ko="재물 흐름" /></p>
                <p className="mt-2 text-sm leading-7 text-[#6d6675]"><Bi en={p.wealth} ko={p.wealthKo} /></p>
              </div>

              <div className="rounded-xl border border-[#e5dfea] bg-white p-4">
                <p className="font-black text-[#986366]"><Bi en="Caution" ko="유의할 점" /></p>
                <p className="mt-2 text-sm leading-7 text-[#6d6675]"><Bi en={p.caution} ko={p.cautionKo} /></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
