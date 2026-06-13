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

<<<<<<< HEAD
Your Useful Energy is ${useful}. This is the correction key that helps balance your pattern.
=======
This means your life does not move randomly. Your repeated choices, emotional reactions, work rhythm, and relationship patterns are all influenced by this dominant energy structure.

Your Useful Energy is ${useful}. This is the key energy that helps balance your pattern and opens a more stable direction.
>>>>>>> 48b6d4a (Upgrade premium report content)


CAREER PATTERN

You perform best when your natural rhythm is respected.

<<<<<<< HEAD
Your chart favors steady skill development, repeated refinement, and long-term expertise.
=======
Your chart favors steady skill development, repeated refinement, and long-term expertise. You are not designed to chase every opportunity. You are designed to identify the right structure and develop it deeply.

When your dominant energy is used correctly, you can build trust, competence, and visible results.

When it becomes excessive, you may repeat the same method even when the situation requires change.
>>>>>>> 48b6d4a (Upgrade premium report content)


WEALTH PATTERN

Your wealth pattern is connected to energy control.

<<<<<<< HEAD
Money improves when decisions are consistent, timed, and structured.
=======
Money improves when decisions are consistent, timed, and structured. The chart does not favor emotional spending or impulsive risk. It favors asset building, patient accumulation, and strategic positioning.

The role of ${useful} Energy is to correct your money behavior.
>>>>>>> 48b6d4a (Upgrade premium report content)


RELATIONSHIP DYNAMICS

<<<<<<< HEAD
=======
Your relationship pattern is shaped by how your energy gives and receives pressure.

You may need time before fully trusting others. Once trust is formed, stability becomes more important than excitement.

>>>>>>> 48b6d4a (Upgrade premium report content)
A good relationship for you is not simply intense. It must help your energy become balanced.


HEALTH SIGNAL

This is not medical advice.

<<<<<<< HEAD
Your chart shows an energy tendency. The goal is rhythm, regulation, and balance.
=======
Your chart shows an energy tendency. When one energy becomes excessive, stress can repeat in related patterns. The goal is not fear. The goal is rhythm, regulation, and balance.
>>>>>>> 48b6d4a (Upgrade premium report content)


FIRST ACTION PLAN

1. Focus on one skill that compounds over time.
2. Reduce unnecessary commitments.
3. Build assets before expansion.
4. Use ${useful} Energy intentionally.
<<<<<<< HEAD
=======
5. Do not confuse familiar patterns with correct direction.
>>>>>>> 48b6d4a (Upgrade premium report content)
`
}

export function getSilverReport(result: any) {
  const { dominant, useful, strength } = common(result)

  return `
NAVIGATOR REPORT

CORE STRUCTURE

Your chart shows a ${strength} LifeCode pattern centered around ${dominant} Energy.

<<<<<<< HEAD
Silver reveals the hidden movement behind your visible structure.
=======
Bronze reveals the visible structure. Silver begins to reveal the hidden movement behind it.
>>>>>>> 48b6d4a (Upgrade premium report content)


HIDDEN TALENT MAP

Your hidden talent appears when pressure increases.

<<<<<<< HEAD
=======
You may not always recognize your own strength because it feels natural to you. However, others may experience it as reliability, judgment, depth, persistence, or strategic awareness.

>>>>>>> 48b6d4a (Upgrade premium report content)
Your talent becomes valuable when it is organized into a repeatable system.


HIDDEN RISK MAP

Your main risk is not weakness.

Your main risk is repetition.

When ${dominant} Energy dominates unconsciously, you may continue using the same response even when the external situation has changed.

<<<<<<< HEAD
=======
This can create repeated delays in work, money, and relationships.

>>>>>>> 48b6d4a (Upgrade premium report content)

USEFUL ENERGY CORRECTION

Useful Energy: ${useful}

This is the correction key.

<<<<<<< HEAD
When ${useful} Energy is active, your decisions become clearer and opportunities become easier to recognize.
=======
It is not merely a lucky element. It is the energy that allows your structure to breathe.

When ${useful} Energy is active, your decisions become clearer, relationships become more stable, and opportunities become easier to recognize.
>>>>>>> 48b6d4a (Upgrade premium report content)


PARTNER PROFILE

<<<<<<< HEAD
The best partner is one who activates balance.

A supportive partner should help your Useful Energy become active.
=======
The best partner for you is not always the most exciting person.

The best partner is one who activates balance.

A supportive partner should not amplify your imbalance. They should help your Useful Energy become active.


LIFE MOMENTUM

Your life improves when direction replaces reaction.

Silver-level guidance is about navigation:
- what to follow
- what to avoid
- what to strengthen
- what to stop repeating
>>>>>>> 48b6d4a (Upgrade premium report content)


10-YEAR TREND PREVIEW

<<<<<<< HEAD
If your dominant energy remains unconscious, the same pattern repeats.
=======
Your long-term growth depends on whether your dominant energy becomes trained.

If it remains unconscious, the same pattern repeats.
>>>>>>> 48b6d4a (Upgrade premium report content)
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

<<<<<<< HEAD

WEALTH EXPANSION STRATEGY

Wealth comes from repeated decisions aligned with timing, structure, and energy.

Your wealth expands when ${dominant} Energy becomes productive rather than repetitive.

=======
The key question is not:
"What am I?"

The key question is:
"How do I use this structure to make better decisions?"


WEALTH EXPANSION STRATEGY

Wealth does not come only from effort.

It comes from repeated decisions aligned with timing, structure, and energy.

Your wealth expands when ${dominant} Energy becomes productive rather than repetitive.

Useful Energy ${useful} should be used as the correction point in financial decisions.

>>>>>>> 48b6d4a (Upgrade premium report content)

BUSINESS APTITUDE

Your chart favors business activity when structure is clear.

<<<<<<< HEAD
You are better suited to projects where expertise, timing, trust, systems, and reputation matter.
=======
You should avoid environments where decisions are made only through emotion or temporary excitement.

You are better suited to projects where:
- expertise matters
- timing matters
- trust matters
- system building matters
- long-term reputation matters
>>>>>>> 48b6d4a (Upgrade premium report content)


LEADERSHIP PATTERN

<<<<<<< HEAD
Your leadership style may appear through judgment, consistency, protection, planning, or deep responsibility.
=======
Your leadership style is not necessarily loud.

It may appear through judgment, consistency, protection, planning, or deep responsibility.

When balanced, people trust your presence.
When imbalanced, people may feel pressure from your dominant energy.
>>>>>>> 48b6d4a (Upgrade premium report content)


DECISION FRAMEWORK

Before major decisions, ask:

1. Is this decision strengthening my Useful Energy?
2. Is this just my dominant energy repeating itself?
3. Does this opportunity have structure?
4. Does the timing support expansion?
<<<<<<< HEAD
=======
5. What will this decision look like in 10 years?
>>>>>>> 48b6d4a (Upgrade premium report content)


OPPORTUNITY WINDOWS

Opportunity appears when internal structure and external timing align.
<<<<<<< HEAD
=======

You do not need to chase every opportunity.

You need to recognize the few moments when your energy, environment, and timing open together.


RELATIONSHIP STRATEGY

Relationships affect your destiny more than they appear.

The wrong relationship repeats your imbalance.
The right relationship activates correction.

Gold-level relationship analysis focuses on energetic compatibility, not surface attraction.


HEALTH ENERGY MAP

This is not medical advice.

Health tendency is read as an energy balance signal.

If one energy is excessive, life rhythm must be regulated. The practical answer is not fear. It is correction, recovery, and conscious rhythm.
>>>>>>> 48b6d4a (Upgrade premium report content)
`
}

export function getPlatinumReport(result: any) {
  const { dominant, useful, strength } = common(result)

  return `
LIFECODE BLUEPRINT

EXECUTIVE SUMMARY

Your LifeCode is a ${strength} structure centered around ${dominant} Energy.

Platinum is the full strategic blueprint.

<<<<<<< HEAD
=======
This report is designed for people who want to understand not only who they are, but how to use their structure in career, wealth, relationships, leadership, and long-term direction.

>>>>>>> 48b6d4a (Upgrade premium report content)

LIFE MISSION

Your life mission is to transform raw energy into conscious direction.

Dominant Energy: ${dominant}
Useful Energy: ${useful}

<<<<<<< HEAD

BUSINESS STRATEGY

Your business path should be built on structure, timing, credibility, and repeatable value.
=======
When ${dominant} Energy is immature, it repeats.
When trained, it becomes power.
When corrected by ${useful} Energy, it becomes destiny strategy.


BUSINESS STRATEGY

Your business path should not be built on impulse.

It should be built on structure, timing, credibility, and repeatable value.

The best business model for your LifeCode is one where your natural energy can become a system.

Avoid projects that require constant emotional stimulation but create no durable asset.
>>>>>>> 48b6d4a (Upgrade premium report content)


WEALTH PRESERVATION

Making money and preserving money are different skills.

<<<<<<< HEAD
=======
Your chart shows that wealth becomes stable when decisions are filtered through Useful Energy.

>>>>>>> 48b6d4a (Upgrade premium report content)
Before expansion, preserve structure.
Before risk, verify timing.
Before partnership, test alignment.


PARTNERSHIP SELECTION

<<<<<<< HEAD
The right partner multiplies destiny.

Partnership should be judged by stability, timing, trust, long-term usefulness, and ability to activate ${useful} Energy.
=======
The wrong partner drains destiny.

The right partner multiplies it.

Partnership should be judged by:
- stability
- timing
- energy compatibility
- trust
- long-term usefulness
- ability to activate ${useful} Energy
>>>>>>> 48b6d4a (Upgrade premium report content)


LEADERSHIP EVOLUTION

Your leadership evolves through responsibility.

<<<<<<< HEAD
=======
At early stages, dominant energy may appear as pressure.
At mature stages, it becomes authority.

>>>>>>> 48b6d4a (Upgrade premium report content)
True leadership begins when your energy no longer needs to prove itself.


PLANETARY TIMING

<<<<<<< HEAD
Sunlit energy brings visibility, action, and external expression.
Moonlit energy brings storage, depth, refinement, and internal preparation.

=======
Your timing should be understood as planetary energy movement.

Sunlit energy brings visibility, action, and external expression.
Moonlit energy brings storage, depth, refinement, and internal preparation.

The highest results occur when action and preparation are correctly sequenced.

>>>>>>> 48b6d4a (Upgrade premium report content)

FUTURE SCENARIO MATRIX

SCENARIO A - CONSERVATIVE GROWTH
<<<<<<< HEAD
You protect stability, reduce risk, and build slowly.

SCENARIO B - STRATEGIC EXPANSION
You use Useful Energy consciously and expand only when structure is ready.

SCENARIO C - MAXIMUM OPPORTUNITY
You take larger action during favorable timing.


FINAL STRATEGIC GUIDANCE
=======

You protect stability, reduce risk, and build slowly.
This path is safe but may limit expansion.


SCENARIO B - STRATEGIC EXPANSION

You use Useful Energy consciously and expand only when structure is ready.
This is the most balanced path.


SCENARIO C - MAXIMUM OPPORTUNITY

You take larger action during favorable timing.
This path can bring greater reward, but only if discipline is strong.


PERSONAL BLUEPRINT
>>>>>>> 48b6d4a (Upgrade premium report content)

Your destiny is not a fixed prison.

It is a pattern.

A pattern can repeat unconsciously.
Or it can be decoded, corrected, and used.
<<<<<<< HEAD
=======

K-upfate exists to help you read that pattern and turn it into strategy.


FINAL STRATEGIC GUIDANCE

Do not ask only:
"What is my fate?"

Ask:
"What structure am I repeating?"
"What energy completes me?"
"What timing supports me?"
"What should I stop doing?"
"What should I build now?"

Your answer begins with ${useful} Energy.
>>>>>>> 48b6d4a (Upgrade premium report content)
`
}
