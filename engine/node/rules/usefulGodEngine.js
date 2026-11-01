"use strict"

// kupfate v7 — 용신·희신 최종 선정 규칙
// 정책 1: 일간 오행과 월지 오행이 같으면 신강·신약과 관계없이 조후용신 우선.
// 정책 2: 서로 다르면 기존 v6의 억부용신 분기를 유지.
// 정책 3: 조후용신 월지별 오행표와 희신(용신이 생하는 오행)은 기존 값 유지.

const GENERATES = Object.freeze({
  Tree: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Tree"
})

// 지지 인덱스: 子0 丑1 寅2 卯3 辰4 巳5 午6 未7 申8 酉9 戌10 亥11
// 이 표는 기존 유효한 운영 정책을 그대로 옮긴 것입니다.
const CLIMATE_USEFUL_BY_BRANCH = Object.freeze([
  "Fire",  // 子 (0)
  "Fire",  // 丑 (1)
  "Metal", // 寅 (2)
  "Metal", // 卯 (3)
  "Metal", // 辰 (4)
  "Water", // 巳 (5)
  "Water", // 午 (6)
  "Water", // 未 (7)
  "Fire",  // 申 (8)
  "Fire",  // 酉 (9)
  "Fire",  // 戌 (10)
  "Fire"   // 亥 (11)
])

function childElementOf(element) {
  return GENERATES[element]
}

function wealthElementOf(element) {
  return childElementOf(childElementOf(element))
}

function climateUsefulEnergyByMonth(monthBranchIndex) {
  if (
    !Number.isInteger(monthBranchIndex) ||
    monthBranchIndex < 0 ||
    monthBranchIndex >= CLIMATE_USEFUL_BY_BRANCH.length
  ) {
    throw new Error(`Invalid month branch index: ${monthBranchIndex}`)
  }

  return CLIMATE_USEFUL_BY_BRANCH[monthBranchIndex]
}

function calculateUsefulEnergySet(strength, pillars) {
  const dayEnergy = strength?.dayEnergy
  const level = strength?.level
  const monthBranch = pillars?.month?.branch

  if (!Object.prototype.hasOwnProperty.call(GENERATES, dayEnergy)) {
    throw new Error("Invalid Day Master energy")
  }

  if (
    !monthBranch ||
    !Object.prototype.hasOwnProperty.call(GENERATES, monthBranch.element) ||
    !Number.isInteger(monthBranch.index) ||
    monthBranch.index < 0 ||
    monthBranch.index > 11
  ) {
    throw new Error("Invalid month branch")
  }

  // 최우선: 월지 오행과 일간 오행이 같으면 무조건 조후.
  // strength.climateMode 플래그가 잘못 전달돼도 이 최종 정책을 적용합니다.
  if (dayEnergy === monthBranch.element) {
    const useful = climateUsefulEnergyByMonth(monthBranch.index)

    return {
      usefulEnergy: useful,
      supportingEnergy: childElementOf(useful),
      usefulMethod: "Climate Useful Energy"
    }
  }

  // 아래는 일간과 월지의 오행이 서로 다를 때만 적용됩니다.
  // 기존 강약 분기와 반환 인터페이스는 변경하지 않습니다.
  if (
    level === "Strong" ||
    level === "Very Strong" ||
    level === "Extremely Strong"
  ) {
    return {
      usefulEnergy: childElementOf(dayEnergy),
      supportingEnergy: wealthElementOf(dayEnergy),
      usefulMethod: "Strong Day Master: Output first, Wealth second"
    }
  }

  if (level === "Weak" || level === "Very Weak") {
    return {
      usefulEnergy: strength.motherEnergy,
      supportingEnergy: dayEnergy,
      usefulMethod: "Weak Day Master: Resource first, Peer second"
    }
  }

  if (level === "Balanced") {
    return {
      usefulEnergy: childElementOf(dayEnergy),
      supportingEnergy: wealthElementOf(dayEnergy),
      usefulMethod: "Balanced Day Master: Output and Wealth flow"
    }
  }

  throw new Error(`Unsupported strength level: ${level}`)
}

module.exports = { calculateUsefulEnergySet }
