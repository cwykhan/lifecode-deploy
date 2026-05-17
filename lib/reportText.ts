export function generateReport(result: any, plan: string) {
  const dominant = result?.strength?.dominantEnergy || "Fire"
  const useful = result?.usefulEnergy || "Water"
  const level = result?.strength?.level || "Strong"

  const dominantText: Record<string, string> = {
    Tree: "Tree energy represents growth, planning, education, movement, vision, and future-oriented expansion. When Tree dominates, the person tends to seek development, progress, and direction. The strength is the ability to design a path forward; the risk is impatience, overextension, or resistance when growth is blocked.",

    Fire: "Fire energy represents expression, visibility, emotion, charisma, speed, leadership, and public influence. When Fire dominates, the person tends to radiate outward, act quickly, and influence others through presence and intensity. The strength is attraction and momentum; the risk is overexposure, emotional exhaustion, or impulsive judgment.",

    Earth: "Earth energy represents stability, responsibility, mediation, storage, patience, and structure. When Earth dominates, the person tends to hold things together, manage burdens, and create reliability. The strength is endurance and practical support; the risk is stagnation, heaviness, or becoming trapped by responsibility.",

    Metal: "Metal energy represents precision, discipline, judgment, refinement, rules, and execution. When Metal dominates, the person tends to seek clarity, order, quality, and control. The strength is accuracy and decision power; the risk is rigidity, harshness, or excessive self-pressure.",

    Water: "Water energy represents intelligence, adaptation, hidden movement, strategy, depth, flexibility, and long-term survival. When Water dominates, the person tends to think deeply, observe quietly, and move indirectly. The strength is strategy and insight; the risk is hesitation, secrecy, or emotional coldness."
  }

  const usefulText: Record<string, string> = {
    Tree: "Tree Useful Energy means growth, learning, movement, planning, and expansion help restore balance. The person benefits from education, long-term goals, travel, writing, mentoring, and environments that encourage development.",

    Fire: "Fire Useful Energy means visibility, confidence, expression, warmth, and active movement help restore balance. The person benefits from communication, branding, public activity, performance, leadership, and emotional openness.",

    Earth: "Earth Useful Energy means grounding, routine, responsibility, practical structure, and stable environments help restore balance. The person benefits from consistency, asset-building, real-world systems, disciplined daily life, and dependable relationships.",

    Metal: "Metal Useful Energy means discipline, boundaries, organization, refinement, and decisive structure help restore balance. The person benefits from rules, contracts, expert skills, quality control, financial discipline, and clear decision-making.",

    Water: "Water Useful Energy means flexibility, patience, strategy, knowledge, rest, and adaptive movement help restore balance. The person benefits from research, planning, quiet recovery, analysis, international flow, and indirect strategy."
  }

  const strengthText: Record<string, string> = {
    Strong: "The structure is strongly concentrated around one dominant energy. This gives force, specialization, and influence, but it also increases the danger of imbalance. The key is not to destroy the dominant energy, but to guide it through the Useful Energy.",

    Balance: "The structure has a relatively balanced distribution. This gives adaptability and broad compatibility. The key is to avoid becoming scattered and to deliberately choose one direction where the Useful Energy can create momentum.",

    Weak: "The structure lacks concentrated force in one central area. This does not mean weakness as a person; it means the chart depends more on support, timing, environment, and external structure. The Useful Energy becomes especially important."
  }

  const core = `
Core Structure:
${strengthText[level]}

Dominant Energy:
${dominantText[dominant]}

Useful Energy:
${usefulText[useful]}
`

  if (plan === "commons") {
    return `
${core}

Basic Guidance:
This report shows the foundation of the chart: Four Pillars, Five Energy ratio, dominant energy, strength level, and Useful Energy. It is designed as an entry-level reading for understanding the basic structure.
`
  }

  if (plan === "merchants") {
    return `
${core}

Personality Pattern:
The dominant energy describes how the person naturally reacts to pressure, opportunity, people, and responsibility. When ${dominant} is strong, the person should not simply suppress this force. Instead, the goal is to direct it toward productive use.

Career Direction:
A ${dominant}-dominant structure tends to succeed when the work environment allows the natural energy to operate. If the environment constantly blocks this energy, stress increases and results decline. The Useful Energy, ${useful}, shows the kind of environment or method that improves performance.

Money Pattern:
Financial results improve when the person avoids acting only from the dominant energy. The dominant energy creates momentum, but the Useful Energy creates balance. For practical money decisions, the person should use ${useful} principles before major commitments.

Balance Strategy:
When life feels unstable, excessive, or blocked, the person should return to the Useful Energy. ${useful} is the correction path. It is not merely a lucky element; it is the balancing mechanism of the structure.

Practical Advice:
Use the dominant energy as the engine, but use the Useful Energy as the steering wheel. This is the main principle of the Merchants-level report.
`
  }

  if (plan === "nobility") {
    return `
${core}

1. Personality Pattern:
This chart shows a clear behavioral center around ${dominant}. The person is likely to repeat certain reactions in work, relationships, money, and conflict. These repeated patterns are not random personality traits; they are the expression of the dominant energy.

2. Career Analysis:
Career success depends on whether the person can use ${dominant} without becoming consumed by it. A suitable career path should allow the dominant energy to be expressed, while the Useful Energy ${useful} provides structure, correction, and long-term sustainability.

3. Wealth Analysis:
Money is not only about effort. In this structure, financial stability depends on timing, moderation, and the relationship between dominant force and corrective force. When ${dominant} becomes excessive, financial decisions may become distorted. ${useful} should be used as the principle for money management.

4. Relationship Analysis:
In relationships, the dominant energy affects communication style, emotional reaction, attraction, and conflict. If ${dominant} is overexpressed, the person may unconsciously demand that others accept this energy. Better relationships form when the Useful Energy ${useful} is consciously practiced.

5. Health Tendency:
Health interpretation should focus on imbalance tendency, not fixed disease prediction. When one energy becomes excessive, the body and mind may show stress through rhythm, sleep, digestion, emotional pressure, fatigue, or tension. The Useful Energy indicates the direction of lifestyle correction.

6. Risk Management:
The greatest risk is not the dominant energy itself. The real risk is using the dominant energy in every situation. A strong tool becomes dangerous when used without discrimination. The person must know when to apply force and when to shift into ${useful}.

7. Strategic Direction:
The Nobility path is not about merely surviving. It is about refining the chart into a stable life strategy. The person should build work, relationships, money habits, and health routines around the corrective function of ${useful}.

Final Guidance:
The chart becomes stronger when the dominant energy is respected but not allowed to rule everything. The Useful Energy is the key to turning raw force into refined destiny.
`
  }

  return `
${core}

EMPEROR LEVEL REPORT

1. Core Destiny Architecture:
This chart is organized around the dominant force of ${dominant}. This creates a powerful internal architecture. The person does not move randomly; many life decisions are shaped by the repeated pressure of this dominant energy. Understanding this pattern is the first step toward mastery.

2. Power and Vulnerability:
Every dominant energy gives a gift and a weakness. ${dominant} gives force, direction, and identity, but it can also become the source of distortion when overused. The person must learn that the strongest energy is not always the correct energy for every situation.

3. Useful Energy as Command Principle:
The Useful Energy, ${useful}, is the command principle of this chart. It does not merely “help.” It governs how the dominant energy should be controlled, redirected, and refined. Without ${useful}, the chart may become powerful but unstable.

4. Career and Authority:
Career development should be built around the correct use of ${dominant}. The person may have strong potential for influence, specialization, execution, or leadership depending on how this energy appears in life. However, the highest results come when career choices also contain the qualities of ${useful}.

5. Wealth and Resource Strategy:
Wealth is created when energy is converted into stable value. If ${dominant} pushes too hard, money decisions may become extreme, impatient, defensive, or emotionally driven. The Emperor strategy is to use ${useful} as a filter before major financial decisions.

6. Relationship and Human Influence:
The person’s relationship pattern is strongly affected by the dominant energy. Others may feel the force of this chart even when the person does not intend to pressure them. The key is controlled expression. ${useful} helps transform raw influence into trust, respect, and emotional stability.

7. Health and Recovery Strategy:
This report does not claim fixed medical destiny. Instead, it identifies energetic imbalance tendency. When ${dominant} becomes excessive, the body and mind may lose rhythm. Recovery should be designed around the qualities of ${useful}: environment, behavior, schedule, emotional regulation, and lifestyle correction.

8. Timing and Strategic Patience:
A powerful chart must not move at every opportunity. The person should learn selective timing. When the environment supports ${useful}, decisions become cleaner and outcomes become more stable. When the environment inflames excessive ${dominant}, caution is required.

9. Risk Avoidance:
The biggest danger is self-amplification. If the person keeps choosing environments, people, habits, and ambitions that only increase ${dominant}, the chart may become unstable. The Emperor path requires deliberate counterbalance.

10. Life Strategy:
The person should not seek ordinary balance by weakening the core. The correct strategy is controlled power. Preserve the strength of ${dominant}, but place it under the discipline of ${useful}. This turns force into command.

11. Final Emperor Guidance:
Your strongest energy is not your destiny by itself. It is your raw material. Your Useful Energy is the method by which that raw material becomes authority, wealth, stability, and direction. The purpose of this report is to show how to turn excessive force into usable power.
`
}
