
const GENERATES = {
  Tree: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Tree"
}

function childElementOf(element) {
  return GENERATES[element]
}

function wealthElementOf(element) {
  return childElementOf(childElementOf(element))
}

function climateUsefulEnergyByMonth(monthBranchIndex) {
  if ([11, 0, 1].includes(monthBranchIndex)) return "Fire"
  if ([5, 6, 7].includes(monthBranchIndex)) return "Water"
  if ([2, 3, 4].includes(monthBranchIndex)) return "Metal"
  if ([8, 9, 10].includes(monthBranchIndex)) return "Fire"
  return "Metal"
}

function calculateUsefulEnergySet(strength, pillars) {
  const dayEnergy = strength.dayEnergy
  const level = strength.level

  if (!GENERATES[dayEnergy]) {
    throw new Error("Invalid Day Master energy")
  }

  // 조후용신 우선 정책 유지
  if (strength.climateMode) {
    const useful = climateUsefulEnergyByMonth(
      pillars.month.branch.index
    )

    return {
      usefulEnergy: useful,
      supportingEnergy: childElementOf(useful),
      usefulMethod: "Climate Useful Energy"
    }
  }

  // 신강, 신태강, 극신강
  if (
    level === "Strong" ||
    level === "Very Strong" ||
    level === "Extremely Strong"
  ) {
    return {
      usefulEnergy: childElementOf(dayEnergy),
      supportingEnergy: wealthElementOf(dayEnergy),
      usefulMethod:
        "Strong Day Master: Output first, Wealth second"
    }
  }

  // 신약 영역
  if (
    level === "Weak" ||
    level === "Very Weak"
  ) {
    return {
      usefulEnergy: strength.motherEnergy,
      supportingEnergy: dayEnergy,
      usefulMethod:
        "Weak Day Master: Resource first, Peer second"
    }
  }

  // 중화
  if (level === "Balanced") {
    return {
      usefulEnergy: childElementOf(dayEnergy),
      supportingEnergy: wealthElementOf(dayEnergy),
      usefulMethod:
        "Balanced Day Master: Output and Wealth flow"
    }
  }

  throw new Error(`Unsupported strength level: ${level}`)
}

module.exports = { calculateUsefulEnergySet }
