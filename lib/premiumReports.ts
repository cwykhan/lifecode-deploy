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

Your wealth pattern is connected to energy control.

Money improves when decisions are consistent, timed, and structured.


RELATIONSHIP DYNAMICS

A good relationship for you is not simply intense. It must help your energy become balanced.


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

CORE STRUCTURE

Your chart shows a ${strength} LifeCode pattern centered around ${dominant} Energy.

Silver reveals the hidden movement behind your visible structure.


HIDDEN TALENT MAP

Your hidden talent appears when pressure increases.

Your talent becomes valuable when it is organized into a repeatable system.


HIDDEN RISK MAP

Your main risk is not weakness.

Your main risk is repetition.

When ${dominant} Energy dominates unconsciously, you may continue using the same response even when the external situation has changed.


USEFUL ENERGY CORRECTION

Useful Energy: ${useful}

This is the correction key.

When ${useful} Energy is active, your decisions become clearer and opportunities become easier to recognize.


PARTNER PROFILE

The best partner is one who activates balance.

A supportive partner should help your Useful Energy become active.


10-YEAR TREND PREVIEW

If your dominant energy remains unconscious, the same pattern repeats.
If it becomes disciplined, it turns into power.
If ${useful} Energy is added, it becomes direction.
`
}

export function getGoldReport(result: any) {
  const { dominant, useful, strength } = common(result)

  return `
STRATEGIST REPORT

CORE STRATEGIC PROFILE

Your LifeCode shows a ${strength} structure centered around ${dominant} Energy.

Gold is not about simple personality description. Gold is about strategy.


WEALTH EXPANSION STRATEGY

Wealth comes from repeated decisions aligned with timing, structure, and energy.

Your wealth expands when ${dominant} Energy becomes productive rather than repetitive.


BUSINESS APTITUDE

Your chart favors business activity when structure is clear.

You are better suited to projects where expertise, timing, trust, systems, and reputation matter.


LEADERSHIP PATTERN

Your leadership style may appear through judgment, consistency, protection, planning, or deep responsibility.


DECISION FRAMEWORK

Before major decisions, ask:

1. Is this decision strengthening my Useful Energy?
2. Is this just my dominant energy repeating itself?
3. Does this opportunity have structure?
4. Does the timing support expansion?


OPPORTUNITY WINDOWS

Opportunity appears when internal structure and external timing align.
`
}

export function getPlatinumReport(result: any) {
  const { dominant, useful, strength } = common(result)

  return `
LIFECODE BLUEPRINT

EXECUTIVE SUMMARY

Your LifeCode is a ${strength} structure centered around ${dominant} Energy.

Platinum is the full strategic blueprint.


LIFE MISSION

Your life mission is to transform raw energy into conscious direction.

Dominant Energy: ${dominant}
Useful Energy: ${useful}


BUSINESS STRATEGY

Your business path should be built on structure, timing, credibility, and repeatable value.


WEALTH PRESERVATION

Making money and preserving money are different skills.

Before expansion, preserve structure.
Before risk, verify timing.
Before partnership, test alignment.


PARTNERSHIP SELECTION

The right partner multiplies destiny.

Partnership should be judged by stability, timing, trust, long-term usefulness, and ability to activate ${useful} Energy.


LEADERSHIP EVOLUTION

Your leadership evolves through responsibility.

True leadership begins when your energy no longer needs to prove itself.


PLANETARY TIMING

Sunlit energy brings visibility, action, and external expression.
Moonlit energy brings storage, depth, refinement, and internal preparation.


FUTURE SCENARIO MATRIX

SCENARIO A - CONSERVATIVE GROWTH
You protect stability, reduce risk, and build slowly.

SCENARIO B - STRATEGIC EXPANSION
You use Useful Energy consciously and expand only when structure is ready.

SCENARIO C - MAXIMUM OPPORTUNITY
You take larger action during favorable timing.


FINAL STRATEGIC GUIDANCE

Your destiny is not a fixed prison.

It is a pattern.

A pattern can repeat unconsciously.
Or it can be decoded, corrected, and used.
`
}
