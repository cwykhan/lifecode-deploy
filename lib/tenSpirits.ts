type StemInfo = {
  symbol: string
  element: "Tree" | "Fire" | "Earth" | "Metal" | "Water"
  sunlit: boolean
}

const stems: Record<string, StemInfo> = {
  T: { symbol: "T", element: "Tree", sunlit: true },
  t: { symbol: "t", element: "Tree", sunlit: false },
  F: { symbol: "F", element: "Fire", sunlit: true },
  f: { symbol: "f", element: "Fire", sunlit: false },
  E: { symbol: "E", element: "Earth", sunlit: true },
  e: { symbol: "e", element: "Earth", sunlit: false },
  M: { symbol: "M", element: "Metal", sunlit: true },
  m: { symbol: "m", element: "Metal", sunlit: false },
  W: { symbol: "W", element: "Water", sunlit: true },
  w: { symbol: "w", element: "Water", sunlit: false }
}

const generates: Record<string, string> = {
  Tree: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Tree"
}

const controls: Record<string, string> = {
  Tree: "Earth",
  Earth: "Water",
  Water: "Fire",
  Fire: "Metal",
  Metal: "Tree"
}

export const hiddenSkyEnergy: Record<number, string[]> = {
  0: ["W", "w"],
  1: ["w", "m", "e"],
  2: ["E", "F", "T"],
  3: ["T", "t"],
  4: ["t", "w", "E"],
  5: ["E", "M", "F"],
  6: ["F", "f", "e"],
  7: ["f", "t", "e"],
  8: ["E", "W", "M"],
  9: ["M", "m"],
  10: ["m", "f", "E"],
  11: ["E", "T", "W"]
}

export const spiritText: Record<string, any> = {
  es: {
    name: "equal shoulder",
    meaning: "self-drive, independence, personal will, and strong identity"
  },
  tm: {
    name: "Threat money",
    meaning: "competition, family pressure, resource conflict, and survival instinct"
  },
  fg: {
    name: "food god",
    meaning: "talent, expression, skill, comfort, and productive ability"
  },
  th: {
    name: "Threat honor",
    meaning: "rebellion, sharp speech, challenge to authority, and unconventional expression"
  },
  bm: {
    name: "bias money",
    meaning: "business sense, opportunity, external wealth, and practical resource handling"
  },
  rm: {
    name: "Right money",
    meaning: "stable wealth, responsibility, realistic judgment, and dependable management"
  },
  bh: {
    name: "Bias honor",
    meaning: "pressure, discipline, crisis response, authority tension, and survival power"
  },
  rh: {
    name: "Right honor",
    meaning: "status, order, social trust, reputation, and honorable structure"
  },
  bs: {
    name: "bias stamp",
    meaning: "special knowledge, unusual thinking, isolation, and private intelligence"
  },
  rs: {
    name: "Right stamp",
    meaning: "education, protection, family support, tradition, and stable background"
  }
}

export function getTenSpirit(dayStemSymbol: string, targetStemSymbol: string) {
  const day = stems[dayStemSymbol] || stems.E
  const target = stems[targetStemSymbol] || stems.E
  const samePolarity = day.sunlit === target.sunlit

  let code = "es"

  if (target.element === day.element) {
    code = samePolarity ? "es" : "tm"
  } else if (generates[day.element] === target.element) {
    code = samePolarity ? "fg" : "th"
  } else if (controls[day.element] === target.element) {
    code = samePolarity ? "bm" : "rm"
  } else if (controls[target.element] === day.element) {
    code = samePolarity ? "bh" : "rh"
  } else if (generates[target.element] === day.element) {
    code = samePolarity ? "bs" : "rs"
  }

  return {
    code,
    stem: targetStemSymbol,
    name: spiritText[code].name,
    meaning: spiritText[code].meaning
  }
}

export function getFamilyRootSignal(result: any) {
  const dayStem = result?.pillars?.day?.stem?.symbol || "E"
  const yearStem = result?.pillars?.year?.stem?.symbol || "E"
  const yearBranchIndex = result?.pillars?.year?.branch?.index ?? 0

  const targets = [yearStem, ...(hiddenSkyEnergy[yearBranchIndex] || [])]
  const spirits = targets.map((s) => getTenSpirit(dayStem, s))

  const supportive = ["rh", "rs", "rm", "bm"]
  const limited = ["tm", "th", "es", "bs"]

  const goodCount = spirits.filter((s) => supportive.includes(s.code)).length
  const limitedCount = spirits.filter((s) => limited.includes(s.code)).length

  let title = "Mixed Family Root"
  let summary =
    "Your family background shows both support and pressure. Some help may exist, but self-effort remains important."

  if (goodCount > limitedCount) {
    title = "Supportive Family Root"
    summary =
      "Your chart shows a favorable family-root signal. It suggests support from family, social order, education, resources, or ancestral background."
  }

  if (limitedCount > goodCount) {
    title = "Limited Ancestral Support"
    summary =
      "Your chart shows a limited family-root signal. It suggests that strong self-effort may be required, with less reliance on family background or ancestral support."
  }

  return {
    title,
    summary,
    spirits
  }
}

export function getDayBranchSpiritProfile(result: any) {
  const dayStem = result?.pillars?.day?.stem?.symbol || "E"
  const dayBranchIndex = result?.pillars?.day?.branch?.index ?? 0
  const hse = hiddenSkyEnergy[dayBranchIndex] || []

  return hse.map((s) => getTenSpirit(dayStem, s))
}
