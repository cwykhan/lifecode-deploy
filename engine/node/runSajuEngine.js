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

    score[p.stem.element] += 1
    score[p.branch.element] += 1

    const hse = HIDDEN_SKY_ENERGY[p.branch.index] || []
    for (const stemSymbol of hse) {
      score[elementOfStemSymbol(stemSymbol)] += 0.25
    }
  }

  const total = Object.values(score).reduce((a, b) => a + b, 0)
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
    motherElementOf
  })

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
