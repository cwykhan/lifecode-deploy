const { spawnSync } = require("child_process")
const path = require("path")

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

const BRANCHES = [
  { index: 0, symbol: "w", animal: "Rat", element: "Water" },
  { index: 1, symbol: "e", animal: "Ox", element: "Earth" },
  { index: 2, symbol: "T", animal: "Tiger", element: "Tree" },
  { index: 3, symbol: "t", animal: "Rabbit", element: "Tree" },
  { index: 4, symbol: "E", animal: "Dragon", element: "Earth" },
  { index: 5, symbol: "F", animal: "Snake", element: "Fire" },
  { index: 6, symbol: "f", animal: "Horse", element: "Fire" },
  { index: 7, symbol: "e", animal: "Goat", element: "Earth" },
  { index: 8, symbol: "M", animal: "Monkey", element: "Metal" },
  { index: 9, symbol: "m", animal: "Rooster", element: "Metal" },
  { index: 10, symbol: "E", animal: "Dog", element: "Earth" },
  { index: 11, symbol: "W", animal: "Pig", element: "Water" }
]

const HIDDEN_SKY_ENERGY = {
  0: ["W", "w"],          // Rat
  1: ["w", "m", "e"],     // Ox
  2: ["E", "F", "T"],     // Tiger
  3: ["T", "t"],          // Rabbit
  4: ["t", "w", "E"],     // Dragon
  5: ["E", "M", "F"],     // Snake
  6: ["F", "f", "e"],     // Horse
  7: ["f", "t", "e"],     // Goat
  8: ["E", "W", "M"],     // Monkey
  9: ["M", "m"],          // Rooster
  10: ["m", "f", "E"],    // Dog
  11: ["E", "T", "W"]     // Pig
}

const BRANCH_WEIGHTS = {
  year: 10,
  month: 40,
  day: 35,
  hour: 15
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

function controllingElementOf(element) {
  const controls = {
    Tree: "Earth",
    Earth: "Water",
    Water: "Fire",
    Fire: "Metal",
    Metal: "Tree"
  }

  return Object.entries(controls).find(([, controlled]) => controlled === element)?.[0]
}

function calculateFiveEnergy(pillars) {
  const score = {
    Tree: 0,
    Fire: 0,
    Earth: 0,
    Metal: 0,
    Water: 0
  }

  // visible sky and earth energy count
  for (const key of ["year", "month", "day", "hour"]) {
    const p = pillars[key]
    if (!p) continue

    score[p.stem.element] += 1
    score[p.branch.element] += 1

    // HSE light support
    const hse = HIDDEN_SKY_ENERGY[p.branch.index] || []
    for (const stemSymbol of hse) {
      const element = elementOfStemSymbol(stemSymbol)
      score[element] += 0.25
    }
  }

  const total = Object.values(score).reduce((a, b) => a + b, 0)

  const ratio = {}
  for (const element of ELEMENTS) {
    ratio[element] = Number(((score[element] / total) * 100).toFixed(2))
  }

  return {
    score,
    ratio
  }
}

function calculateDayStrength(pillars) {
  const dayEnergy = pillars.day.stem.element
  const motherEnergy = motherElementOf(dayEnergy)

  let supportScore = 0
  let detail = []

  for (const key of ["year", "month", "day", "hour"]) {
    const branch = pillars[key].branch
    const weight = BRANCH_WEIGHTS[key]

    let gained = 0

    if (branch.element === dayEnergy) {
      gained += weight
      detail.push(`${key} branch supports Day Energy directly: +${weight}`)
    }

    if (branch.element === motherEnergy) {
      gained += weight * 0.7
      detail.push(`${key} branch generates Day Energy: +${Number((weight * 0.7).toFixed(2))}`)
    }

    const hse = HIDDEN_SKY_ENERGY[branch.index] || []
    const hseWeight = weight * 0.3
    const eachHseWeight = hse.length ? hseWeight / hse.length : 0

    for (const stemSymbol of hse) {
      const hseElement = elementOfStemSymbol(stemSymbol)

      if (hseElement === dayEnergy) {
        gained += eachHseWeight
        detail.push(`${key} HSE supports Day Energy: +${Number(eachHseWeight.toFixed(2))}`)
      }

      if (hseElement === motherEnergy) {
        gained += eachHseWeight * 0.7
        detail.push(`${key} HSE generates Day Energy: +${Number((eachHseWeight * 0.7).toFixed(2))}`)
      }
    }

    supportScore += gained
  }

  const value = Number(supportScore.toFixed(2))

  let level = "Weak"
  if (value >= 40) level = "Strong"
  else if (value >= 30) level = "Balance"

  return {
    value,
    level,
    dayEnergy,
    motherEnergy,
    dominantEnergy: dayEnergy,
    detail
  }
}

function calculateUsefulEnergy(strength) {
  const dayEnergy = strength.dayEnergy

  if (strength.level === "Strong") {
    return controllingElementOf(dayEnergy)
  }

  if (strength.level === "Weak") {
    return strength.motherEnergy
  }

  return dayEnergy
}

function normalizeCResult(raw) {
  const pillars = raw.pillars

  const fiveEnergy = calculateFiveEnergy(pillars)
  const strength = calculateDayStrength(pillars)
  const usefulEnergy = calculateUsefulEnergy(strength)

  return {
    ...raw,
    fiveEnergy,
    strength,
    usefulEnergy
  }
}

function runSajuEngine(year, month, day, hour, minute) {
  const cliPath = path.join(__dirname, "..", "cal20000", "saju-cli")

  const result = spawnSync(
    cliPath,
    [String(year), String(month), String(day), String(hour), String(minute)],
    {
      encoding: "utf-8"
    }
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

module.exports = {
  runSajuEngine
}
