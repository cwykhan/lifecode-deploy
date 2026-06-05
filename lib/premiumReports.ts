export function getBronzeReport(result: any) {
  const dominant = result?.strength?.dominantEnergy || "Earth"
  const useful = result?.usefulEnergy || "Metal"

  return `
CAREER STRATEGY

Your chart suggests success through long-term skill accumulation and disciplined execution.

You perform best when responsibility increases gradually and expertise becomes your primary asset.

Avoid environments where short-term emotion dominates decision making.


WEALTH PATTERN

Financial growth occurs through consistency rather than speculation.

The chart favors patience, asset building, and strategic positioning.

Large opportunities often appear after periods of preparation.


RELATIONSHIP DYNAMICS

Trust develops slowly but deeply.

You naturally seek reliability, competence, and emotional stability.


HEALTH SIGNALS

Dominant Energy: ${dominant}

Energy balance should be monitored carefully.

Maintaining equilibrium between dominant and controlling energies creates greater long-term stability.


USEFUL ENERGY GUIDE

Useful Energy: ${useful}

When this energy is strengthened through environment, work, and daily habits, life momentum improves.


FIRST ACTION PLAN

Focus on one compounding skill.

Reduce unnecessary distractions.

Build assets before expansion.

Mastery creates opportunity.
`
}
