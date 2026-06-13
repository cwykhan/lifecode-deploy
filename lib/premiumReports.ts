function common(result: any) {
  const dominant = result?.strength?.dominantEnergy || "Earth"
  const useful = result?.usefulEnergy || "Metal"
  const strength = result?.strength?.level || "Balance"

  return { dominant, useful, strength }
}

export function getBronzeReport(result: any) {
  const { dominant, useful, strength } = common(result)

  return `
EXPLORER REPORT

CORE STRUCTURE

Your LifeCode shows a ${strength} structure centered around ${dominant} Energy.

Your Useful Energy is ${useful}. This is the correction key that helps balance your pattern.

CAREER PATTERN

You perform best when your natural rhythm is respected.
Your chart favors steady skill development, repeated refinement, and long-term expertise.

WEALTH PATTERN

Money improves when decisions are consistent, timed, and structured.
Your wealth pattern improves when ${useful} Energy is used intentionally.

RELATIONSHIP DYNAMICS

A good relationship is not simply intense.
It must help your energy become balanced.

HEALTH SIGNAL

This is not medical advice.
Your chart shows an energy tendency. The goal is rhythm, regulation, and balance.

FIRST ACTION PLAN

1. Focus on one skill that compounds over time.
2. Reduce unnecessary commitments.
3. Build assets before expansion.
4. Use ${useful} Energy intentionally.
`
}

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
