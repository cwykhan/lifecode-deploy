
import "server-only"

// ============================================================
// K-UPFATE Premium Report Engine
// Bronze: Personalized Five-Energy Report
// Silver / Gold / Platinum: Existing reports preserved
// ============================================================

type Energy = "Tree" | "Fire" | "Earth" | "Metal" | "Water"

const ENERGIES: Energy[] = [
  "Tree",
  "Fire",
  "Earth",
  "Metal",
  "Water"
]

const ELEMENT_KO: Record<Energy, string> = {
  Tree: "목(木)",
  Fire: "화(火)",
  Earth: "토(土)",
  Metal: "금(金)",
  Water: "수(水)"
}

const GENERATES: Record<Energy, Energy> = {
  Tree: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Tree"
}

const CONTROLS: Record<Energy, Energy> = {
  Tree: "Earth",
  Fire: "Metal",
  Earth: "Water",
  Metal: "Tree",
  Water: "Fire"
}

function requireEnergy(value: unknown): Energy {
  if (
    typeof value !== "string" ||
    !ENERGIES.includes(value as Energy)
  ) {
    throw new Error("Invalid energy in saju result")
  }

  return value as Energy
}

function getPersonalizedData(result: any) {
  const ratio = result?.fiveEnergy?.ratio
  const strength = result?.strength

  if (!ratio || !strength || !result?.pillars) {
    throw new Error("Incomplete saju result")
  }

  const day = requireEnergy(strength.dayEnergy)
  const mother = requireEnergy(strength.motherEnergy)
  const useful = requireEnergy(result.usefulEnergy)
  const supporting = requireEnergy(result.supportingEnergy)

  if (
    GENERATES[mother] !== day
  ) {
    throw new Error("Invalid resource element relationship")
  }

  const values = Object.fromEntries(
    ENERGIES.map(e => [e, Number(ratio[e])])
  ) as Record<Energy, number>

  if (
    ENERGIES.some(
      e =>
        !Number.isFinite(values[e]) ||
        values[e] < 0 ||
        values[e] > 100
    )
  ) {
    throw new Error("Invalid five-energy ratio")
  }

  const peerRatio = values[day]
  const resourceRatio = values[mother]

  const supportRatio = Number(
    (peerRatio + resourceRatio).toFixed(2)
  )

  const levels = [
    "Weak",
    "Balanced",
    "Strong",
    "Very Strong",
    "Extremely Strong"
  ]

  if (!levels.includes(strength.level)) {
    throw new Error("Unsupported strength level")
  }

  const ranked = [...ENERGIES].sort(
    (a, b) => values[b] - values[a]
  )

  const output = GENERATES[day]
  const wealth = CONTROLS[day]

  const authority = ENERGIES.find(
    e => CONTROLS[e] === day
  )

  return {
    day,
    mother,
    useful,
    supporting,
    values,
    peerRatio,
    resourceRatio,
    supportRatio,
    strongest: ranked[0],
    weakest: ranked[ranked.length - 1],
    level: strength.level as string,
    koreanLevel: strength.koreanLevel as string,
    output,
    wealth,
    authority
  }
}

function getStrengthReading(level: string): string {
  switch (level) {
    case "Extremely Strong":
      return (
        "The Day Master receives exceptionally high " +
        "support from Resource and Peer energy. " +
        "Traditional interpretation emphasizes how " +
        "excess supporting energy is expressed and regulated."
      )

    case "Very Strong":
      return (
        "The Day Master receives substantial support " +
        "from Resource and Peer energy. Expressing " +
        "accumulated ability through productive activity " +
        "becomes an important interpretive theme."
      )

    case "Strong":
      return (
        "The Day Master has more supporting than " +
        "opposing energy. The chart is interpreted " +
        "through the relationship between internal " +
        "strength and outward expression."
      )

    case "Balanced":
      return (
        "Resource and Peer energy fall within the " +
        "configured balanced range. The interaction " +
        "among the five elements deserves more " +
        "attention than strength alone."
      )

    default:
      return (
        "Resource and Peer energy provide comparatively " +
        "limited support. Traditional interpretation " +
        "emphasizes reinforcement, continuity, and " +
        "available resources."
      )
  }
}

// ============================================================
// Shared legacy data for Silver / Gold / Platinum
// ============================================================

function common(result: any) {
  const dominant =
    result?.strength?.dominantEnergy || "Earth"

  const useful =
    result?.usefulEnergy || "Metal"

  const strength =
    result?.strength?.level || "Balance"

  return {
    dominant,
    useful,
    strength
  }
}

// ============================================================
// BRONZE $5 - Personalized Explorer Report
// ============================================================

export function getBronzeReport(result: any) {
  const d = getPersonalizedData(result)

  const energyLines = ENERGIES.map(
    e =>
      `${ELEMENT_KO[e]}: ${d.values[e].toFixed(2)}%`
  ).join("\n")

  const outputRelation =
    d.output === d.useful ||
    d.output === d.supporting
      ? "Output energy aligns with one of your selected balancing energies."
      : "Output energy should be interpreted alongside your selected balancing energies."

  const wealthRelation =
    d.wealth === d.useful ||
    d.wealth === d.supporting
      ? "Wealth energy is also among your selected balancing energies."
      : "Wealth energy and the selected balancing energies play different roles in this chart."

  const authorityLine = d.authority
    ? `Authority Energy (官殺): ${ELEMENT_KO[d.authority]}`
    : "Authority Energy: Not available"

  return `
K-UPFATE | BRONZE EXPLORER REPORT
PERSONALIZED FIVE-ENERGY ANALYSIS

01. YOUR DAY MASTER

Day Master Element: ${ELEMENT_KO[d.day]}
Resource Element (印星): ${ELEMENT_KO[d.mother]}
Peer Element (比劫): ${ELEMENT_KO[d.day]}

The Day Master is the reference point for interpreting
the relationships among the five elements.

02. FIVE-ENERGY DISTRIBUTION

${energyLines}

Highest Proportion: ${ELEMENT_KO[d.strongest]}
Lowest Proportion: ${ELEMENT_KO[d.weakest]}

These proportions are calculated using the current
K-UPFATE five-energy weighting model, which includes
the engine's configured hidden-stem contribution.

03. DAY MASTER STRENGTH

Resource Energy (印星): ${d.resourceRatio.toFixed(2)}%
Peer Energy (比劫): ${d.peerRatio.toFixed(2)}%
Combined Support: ${d.supportRatio.toFixed(2)}%

Classification: ${d.level}
Korean Classification: ${d.koreanLevel}

${getStrengthReading(d.level)}

K-UPFATE Strength Classification:

Below 38%: Weak range
38% to below 45%: Balanced
45% to below 55%: Strong
55% to below 65%: Very Strong
65% and above: Extremely Strong

04. USEFUL AND SUPPORTING ENERGIES

Useful Energy (用神): ${ELEMENT_KO[d.useful]}
Supporting Energy (喜神): ${ELEMENT_KO[d.supporting]}

These energies are selected by the current K-UPFATE
useful-energy engine. They are interpretive indicators,
not guarantees of specific outcomes.

05. CAREER AND EXPRESSION

Output Energy (食傷): ${ELEMENT_KO[d.output]}

${outputRelation}

In traditional five-element interpretation, Output
represents the expression of skills, ideas, and work.

For your chart, consider how your accumulated knowledge
can be translated into practical and repeatable results.

06. WEALTH PATTERN

Wealth Energy (財星): ${ELEMENT_KO[d.wealth]}

${wealthRelation}

Wealth energy represents the element controlled by
your Day Master.

This symbolic relationship can be used to reflect on
resource management, responsibility, and decision-making.

It is not a prediction of investment returns or income.

07. RELATIONSHIPS AND RESPONSIBILITY

${authorityLine}

Authority energy represents the element that controls
your Day Master.

In traditional interpretation, this relationship is
associated with responsibility, expectations, rules,
and boundaries.

Relationship compatibility and specific events require
additional analysis beyond element proportions alone.

08. PERSONAL ACTION GUIDE

1. Review your Resource and Peer balance:
   ${d.supportRatio.toFixed(2)}% combined support.

2. Consider ways to express your Output energy:
   ${ELEMENT_KO[d.output]}.

3. Explore the traditional role of your Useful Energy:
   ${ELEMENT_KO[d.useful]}.

4. Compare your strongest energy
   (${ELEMENT_KO[d.strongest]})
   with your weakest energy
   (${ELEMENT_KO[d.weakest]}).

5. Use this report as a reflection tool rather than
   a substitute for financial, medical, or career advice.

REPORT BASIS

K-UPFATE Strength Engine v5
Five-Energy Ratio Model
Useful-Energy Engine

This report uses a traditional interpretive framework.
Its predictions are not scientifically validated.
`.trim()
}

// ============================================================
// SILVER $15 - Existing report preserved
// ============================================================

export function getSilverReport(result: any) {
  const { dominant, useful, strength } = common(result)

  return `
NAVIGATOR REPORT

Your chart shows a ${strength} LifeCode pattern centered around ${dominant} Energy.

HIDDEN TALENT MAP

Your hidden talent appears when pressure increases.

HIDDEN RISK MAP

Your main risk is repetition.

USEFUL ENERGY CORRECTION

Useful Energy: ${useful}

When ${useful} Energy is active, decisions become clearer.

10-YEAR TREND PREVIEW

If ${useful} Energy is added, your dominant pattern becomes direction.
`
}

// ============================================================
// GOLD $30 - Existing report preserved
// ============================================================

export function getGoldReport(result: any) {
  const { dominant, useful, strength } = common(result)

  return `
STRATEGIST REPORT

Your LifeCode shows a ${strength} structure centered around ${dominant} Energy.

WEALTH EXPANSION STRATEGY

Wealth comes from repeated decisions aligned with timing, structure, and energy.

BUSINESS APTITUDE

You are better suited to projects where expertise, timing, trust, systems, and reputation matter.

LEADERSHIP PATTERN

Your leadership appears through judgment, consistency, protection, planning, or responsibility.

OPPORTUNITY WINDOWS

Opportunity appears when internal structure and external timing align.
`
}

// ============================================================
// PLATINUM $50 - Existing report preserved
// ============================================================

export function getPlatinumReport(result: any) {
  const { dominant, useful, strength } = common(result)

  return `
LIFECODE BLUEPRINT

Your LifeCode is a ${strength} structure centered around ${dominant} Energy.

LIFE MISSION

Dominant Energy: ${dominant}
Useful Energy: ${useful}

BUSINESS STRATEGY

Build structure, timing, credibility, and repeatable value.

WEALTH PRESERVATION

Before expansion, preserve structure.

PARTNERSHIP SELECTION

The right partner multiplies destiny.

PLANETARY TIMING

Sunlit energy brings visibility and action.
Moonlit energy brings storage and depth.

FUTURE SCENARIO MATRIX

SCENARIO A - CONSERVATIVE GROWTH
SCENARIO B - STRATEGIC EXPANSION
SCENARIO C - MAXIMUM OPPORTUNITY
`
}

