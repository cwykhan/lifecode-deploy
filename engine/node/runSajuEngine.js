const { spawnSync } = require("child_process")
const path = require("path")
const { calculateDayStrength } = require("./rules/strengthEngine")
const { calculateUsefulEnergySet } = require("./rules/usefulGodEngine")

const STEMS = [
  { index: 0, symbol: "T", element: "Tree" },
  { index: 1, symbol: "t", element: "Tree" },
  { index: 2, symbol: "F", element: "Fire" },
  { index: 3, symbol: "f", element: "Fire" },
  { index: 4, symbol: "E", element: "Earth" },
  { index: 5, symbol: "e", element: "Earth" },
  { index: 6, symbol: "M", element: "Metal" },
  { index: 7, symbol: "m", element: "Metal" },
  { index: 8, symbol: "W", element: "Water" },
  { index: 9, symbol: "w", element: "Water" }
]

const HIDDEN_SKY_ENERGY = {
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

// 지장간 월률(30일 환산). 순서는 HIDDEN_SKY_ENERGY 배열과 동일.
// 午(6)는 [丙10, 丁11, 己9] 순서로 기존 배열을 유지한다.
const HIDDEN_SKY_DAYS = {
  0: [10, 20],
  1: [9, 3, 18],
  2: [7, 7, 16],
  3: [10, 20],
  4: [9, 3, 18],
  5: [7, 7, 16],
  6: [10, 11, 9],
  7: [9, 3, 18],
  8: [7, 7, 16],
  9: [10, 20],
  10: [9, 3, 18],
  11: [7, 7, 16]
}

// 각 기둥의 전체 오행 점수 배분. 합계 = 100.
const PILLAR_WEIGHTS = {
  year: 15,
  month: 35,
  day: 20,
  hour: 30
}

// 명시되지 않았던 천간/지지 내부 비중: 일단 각각 절반으로 산정.
// 지지는 본기를 중복 가산하지 않고 지장간 월률로만 분배한다.
const STEM_SHARE = 0.5
const BRANCH_SHARE = 0.5

const ELEMENTS = ["Tree", "Fire", "Earth", "Metal", "Water"]

const GENERATES = {
  Tree: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Tree"
}

function elementOfStemSymbol(symbol) {
  const stem = STEMS.find((s) => s.symbol === symbol)
  return stem ? stem.element : "Earth"
}

function motherElementOf(element) {
  return Object.entries(GENERATES).find(([, child]) => child === element)?.[0]
}

function calculateFiveEnergy(pillars) {
  const score = {
    Tree: 0,
    Fire: 0,
    Earth: 0,
    Metal: 0,
    Water: 0
  }

  for (const key of ["year", "month", "day", "hour"]) {
    const p = pillars[key]
    if (!p) continue

    const weight = PILLAR_WEIGHTS[key]
    const stemElement = p.stem.element
    const branchIndex = p.branch.index

    // 천간: 기둥 가중치의 50%를 천간 오행에 배정.
    score[stemElement] += weight * STEM_SHARE

    // 지지: 기둥 가중치의 50%를 지장간 일수에 따라 배분.
    const hse = HIDDEN_SKY_ENERGY[branchIndex] || []
    const days = HIDDEN_SKY_DAYS[branchIndex] || []
    const totalDays = days.reduce((sum, n) => sum + n, 0)

    if (hse.length !== days.length || totalDays !== 30) {
      throw new Error(`Invalid hidden stem days for branch ${branchIndex}`)
    }

    for (let i = 0; i < hse.length; i++) {
      const element = elementOfStemSymbol(hse[i])
      score[element] += weight * BRANCH_SHARE * (days[i] / totalDays)
    }
  }

  const total = Object.values(score).reduce((a, b) => a + b, 0)
  if (total <= 0) {
    throw new Error("Five energy total must be positive")
  }

  const ratio = {}
  for (const element of ELEMENTS) {
    ratio[element] = Number(((score[element] / total) * 100).toFixed(2))
  }

  return { score, ratio }
}

function normalizeCResult(raw) {
  const pillars = raw.pillars

  const fiveEnergy = calculateFiveEnergy(pillars)

  const strength = calculateDayStrength({
    pillars,
    hiddenSkyEnergy: HIDDEN_SKY_ENERGY,
    elementOfStemSymbol,
    motherElementOf,
    fiveEnergy
  })

  const dominantEnergy = ELEMENTS.reduce((a, b) =>
    fiveEnergy.ratio[a] >= fiveEnergy.ratio[b] ? a : b
  )

  strength.dominantEnergy = dominantEnergy

  const usefulSet = calculateUsefulEnergySet(strength, pillars)

  return {
    ...raw,
    fiveEnergy,
    strength,
    usefulEnergy: usefulSet.usefulEnergy,
    supportingEnergy: usefulSet.supportingEnergy,
    usefulMethod: usefulSet.usefulMethod
  }
}

function runSajuEngine(year, month, day, hour, minute) {
  const cliPath = path.join(__dirname, "..", "cal20000", "saju-cli")

  const result = spawnSync(
    cliPath,
    [String(year), String(month), String(day), String(hour), String(minute)],
    { encoding: "utf-8" }
  )

  if (result.error) {
    throw new Error(`C engine failed: ${result.error.message}`)
  }

  if (result.status !== 0) {
    throw new Error(`C engine failed: ${result.stderr}`)
  }

  const raw = JSON.parse(result.stdout)
  return normalizeCResult(raw)
}

if (require.main === module) {
  const [year, month, day, hour, minute] = process.argv.slice(2).map(Number)
  const result = runSajuEngine(year, month, day, hour, minute)
  console.log(JSON.stringify(result))
}

module.exports = { runSajuEngine }
