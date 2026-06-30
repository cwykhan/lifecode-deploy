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

  if (strength.climateMode) {
    const useful = climateUsefulEnergyByMonth(pillars.month.branch.index)
    return {
      usefulEnergy: useful,
      supportingEnergy: childElementOf(useful),
      usefulMethod: "Climate Useful Energy"
    }
  }

  if (strength.level === "Very Strong" || strength.level === "Strong") {
    return {
      usefulEnergy: childElementOf(dayEnergy),
      supportingEnergy: wealthElementOf(dayEnergy),
      usefulMethod: "Strong Day Master: Output first, Wealth second"
    }
  }

  if (strength.level === "Weak" || strength.level === "Very Weak") {
    return {
      usefulEnergy: strength.motherEnergy,
      supportingEnergy: dayEnergy,
      usefulMethod: "Weak Day Master: Resource first, Peer second"
    }
  }

  return {
    usefulEnergy: childElementOf(dayEnergy),
    supportingEnergy: wealthElementOf(dayEnergy),
    usefulMethod: "Balanced Day Master: Output and Wealth flow"
  }
}

module.exports = { calculateUsefulEnergySet }
