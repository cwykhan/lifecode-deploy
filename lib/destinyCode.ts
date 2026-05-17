export function generateDestinyExperience(result: any) {
  const dominant = result?.strength?.dominantEnergy || "Unknown"
  const useful = result?.usefulEnergy || "Unknown"
  const strengthValue = result?.strength?.value || 0
  const level = result?.strength?.level || "Unknown"
  const pillars = result?.pillars || {}

  const codeSeed = [
    pillars?.year?.stem?.symbol,
    pillars?.month?.branch?.symbol,
    pillars?.day?.stem?.symbol,
    pillars?.hour?.branch?.symbol
  ].filter(Boolean).join("")

  const lifeCode = `${dominant?.[0] || "X"}-${Math.round(strengthValue)}-${useful?.[0] || "X"}-${codeSeed}`

  let rarity = "COMMON STRUCTURE"
  let rarityText = "Your structure is relatively ordinary, but still contains a readable energy pattern."

  if (strengthValue >= 65) {
    rarity = "CELESTIAL VARIANT"
    rarityText = "Your structure shows an extreme concentration pattern. This is not a quiet chart."
  } else if (strengthValue >= 50) {
    rarity = "EXTREME STRUCTURE"
    rarityText = "Your structure contains a powerful dominant force that can create both influence and instability."
  } else if (strengthValue >= 40) {
    rarity = "RARE STRUCTURE"
    rarityText = "Your structure is strongly shaped by one dominant energy pattern."
  }

  const dangerMap: Record<string, string> = {
    Tree: "Uncontrolled Tree can create overextension, impatience, and constant dissatisfaction with stillness.",
    Fire: "Uncontrolled Fire can create emotional acceleration, overexposure, impulsive decisions, and burnout.",
    Earth: "Uncontrolled Earth can create stagnation, burden, heaviness, and excessive responsibility.",
    Metal: "Uncontrolled Metal can create rigidity, harsh judgment, isolation, and excessive self-pressure.",
    Water: "Uncontrolled Water can create hesitation, secrecy, emotional distance, and hidden anxiety."
  }

  const usefulMap: Record<string, string> = {
    Tree: "Your correction path is growth, learning, movement, and long-term direction.",
    Fire: "Your correction path is visibility, confidence, expression, and warm action.",
    Earth: "Your correction path is grounding, routine, stability, and practical structure.",
    Metal: "Your correction path is discipline, boundaries, refinement, and decisive order.",
    Water: "Your correction path is patience, strategy, rest, knowledge, and flexible adaptation."
  }

  const hook =
    level === "Strong"
      ? `A hidden imbalance pattern was detected. Your chart does not become stronger through more ${dominant}. It stabilizes through ${useful}.`
      : level === "Balance"
      ? `Your structure is not extreme, but it contains a subtle hidden pattern. The key is how ${useful} is activated.`
      : `Your structure requires external support and timing alignment. ${useful} becomes the stabilizing key.`

  const lockedMessage = `
Hidden Pattern Locked

The surface result shows your dominant energy.
But the deeper report reveals:

• why this energy repeats in your life
• where your imbalance becomes dangerous
• how your Useful Energy corrects the structure
• which career, wealth, relationship, and health patterns follow from it
• what must be avoided before the structure turns against you
`

  return {
    lifeCode,
    rarity,
    rarityText,
    hook,
    dangerText: dangerMap[dominant] || "",
    usefulText: usefulMap[useful] || "",
    lockedMessage
  }
}
