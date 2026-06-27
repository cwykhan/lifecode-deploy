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

const PILLAR_WEIGHTS = {
  month: 40,
  day: 25,
  hour: 20,
  year: 15
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

function climateUsefulEnergyByMonth(monthBranchIndex, dayEnergy) {
  // 조후용신 v1: 월지와 일간 오행이 같을 때 계절 조절 우선
  // 겨울: Fire, 여름: Water, 봄: Metal, 가을: Fire/Water 보정, 토월: Water/Tree 보정
  if ([11, 0, 1].includes(monthBranchIndex)) return "Fire"       // Pig, Rat, Ox
  if ([5, 6, 7].includes(monthBranchIndex)) return "Water"       // Snake, Horse, Goat
  if ([2, 3, 4].includes(monthBranchIndex)) return "Metal"       // Tiger, Rabbit, Dragon
  if ([8, 9, 10].includes(monthBranchIndex)) return "Fire"       // Monkey, Rooster, Dog

  return controllingElementOf(dayEnergy)
}

function strengthLevel5(value) {
  if (value >= 60) return { level: "Very Strong", korean: "극강" }
  if (value >= 40) return { level: "Strong", korean: "강" }
  if (value >= 30) return { level: "Balanced", korean: "중화" }
  if (value >= 20) return { level: "Weak", korean: "약" }
  return { level: "Very Weak", korean: "극약" }
}

function addSupport(scoreObj, element, amount, dayEnergy, motherEnergy, detail, label) {
  if (element === dayEnergy) {
    scoreObj.value += amount
    detail.push(`${label} supports Day Energy directly: +${Number(amount.toFixed(2))}`)
  }

  if (element === motherEnergy) {
    const v = amount * 0.7
    scoreObj.value += v
    detail.push(`${label} generates Day Energy: +${Number(v.toFixed(2))}`)
  }
}

function climateUsefulEnergyByMonth(monthBranchIndex, dayEnergy) {
  // 조후용신 v1: 월지와 일간 오행이 같을 때 계절 조절 우선
  // 겨울: Fire, 여름: Water, 봄: Metal, 가을: Fire/Water 보정, 토월: Water/Tree 보정
  if ([11, 0, 1].includes(monthBranchIndex)) return "Fire"       // Pig, Rat, Ox
  if ([5, 6, 7].includes(monthBranchIndex)) return "Water"       // Snake, Horse, Goat
  if ([2, 3, 4].includes(monthBranchIndex)) return "Metal"       // Tiger, Rabbit, Dragon
  if ([8, 9, 10].includes(monthBranchIndex)) return "Fire"       // Monkey, Rooster, Dog

  return controllingElementOf(dayEnergy)
}

function strengthLevel5(value) {
  if (value >= 60) return { level: "Very Strong", korean: "극강" }
  if (value >= 40) return { level: "Strong", korean: "강" }
  if (value >= 30) return { level: "Balanced", korean: "중화" }
  if (value >= 20) return { level: "Weak", korean: "약" }
  return { level: "Very Weak", korean: "극약" }
}

function addSupport(scoreObj, element, amount, dayEnergy, motherEnergy, detail, label) {
  if (element === dayEnergy) {
    scoreObj.value += amount
    detail.push(`${label} supports Day Energy directly: +${Number(amount.toFixed(2))}`)
  }

  if (element === motherEnergy) {
    const v = amount * 0.7
    scoreObj.value += v
    detail.push(`${label} generates Day Energy: +${Number(v.toFixed(2))}`)
  }
}

function calculateDayStrength(pillars) {
  const dayEnergy = pillars.day.stem.element
  const motherEnergy = motherElementOf(dayEnergy)
  const monthBranch = pillars.month.branch
  const detail = []
  const scoreObj = { value: 0 }

  // 1. Month branch + hidden sky energy = 40%
  {
    const weight = PILLAR_WEIGHTS.month
    addSupport(scoreObj, monthBranch.element, weight * 0.7, dayEnergy, motherEnergy, detail, "month branch")

    const hse = HIDDEN_SKY_ENERGY[monthBranch.index] || []
    const each = hse.length ? (weight * 0.3) / hse.length : 0
    for (const stemSymbol of hse) {
      addSupport(scoreObj, elementOfStemSymbol(stemSymbol), each, dayEnergy, motherEnergy, detail, "month HSE")
    }
  }

  // 2. Day pillar = 25%, Hour pillar = 20%, Year pillar = 15%
  // stem 40%, branch 40%, hidden stems 20%
  for (const key of ["day", "hour", "year"]) {
    const p = pillars[key]
    const weight = PILLAR_WEIGHTS[key]

    addSupport(scoreObj, p.stem.element, weight * 0.4, dayEnergy, motherEnergy, detail, `${key} stem`)
    addSupport(scoreObj, p.branch.element, weight * 0.4, dayEnergy, motherEnergy, detail, `${key} branch`)

    const hse = HIDDEN_SKY_ENERGY[p.branch.index] || []
    const each = hse.length ? (weight * 0.2) / hse.length : 0
    for (const stemSymbol of hse) {
      addSupport(scoreObj, elementOfStemSymbol(stemSymbol), each, dayEnergy, motherEnergy, detail, `${key} HSE`)
    }
  }

  const value = Number(scoreObj.value.toFixed(2))
  const lv = strengthLevel5(value)
  const climateMode = monthBranch.element === dayEnergy

  return {
    value,
    score: value,
    level: lv.level,
    koreanLevel: lv.korean,
    dayEnergy,
    motherEnergy,
    dominantEnergy: dayEnergy,
    monthBranchEnergy: monthBranch.element,
    climateMode,
    climateUsefulEnergy: climateMode ? climateUsefulEnergyByMonth(monthBranch.index, dayEnergy) : null,
    method: "MonthBranchHSE40-Day25-Hour20-Year15",
    detail
  }
}

function calculateUsefulEnergy(strength) {
  const dayEnergy = strength.dayEnergy

  // 월지와 일간 오행이 같으면 조후용신 우선
  if (strength.climateMode && strength.climateUsefulEnergy) {
    return strength.climateUsefulEnergy
  }

  // 억부용신 기본
  if (strength.level === "Very Strong" || strength.level === "Strong") {
    return controllingElementOf(dayEnergy)
  }

  if (strength.level === "Weak" || strength.level === "Very Weak") {
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
