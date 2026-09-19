const PILLAR_WEIGHTS = {
  month: 35,
  day: 25,
  hour: 22,
  year: 18
}

const GEONROK_BRANCH = {
  T: 2, t: 3,
  F: 5, f: 6,
  E: 5, e: 6,
  M: 8, m: 9,
  W: 11, w: 0
}

function getStrengthLevel5(value) {
  if (value >= 60) return { level: "Very Strong", koreanLevel: "극강" }
  if (value >= 40) return { level: "Strong", koreanLevel: "강" }
  if (value >= 30) return { level: "Balanced", koreanLevel: "중화" }
  if (value >= 20) return { level: "Weak", koreanLevel: "약" }
  return { level: "Very Weak", koreanLevel: "극약" }
}

function calculateDayStrength({
  pillars,
  hiddenSkyEnergy,
  elementOfStemSymbol,
  motherElementOf
}) {
  const dayStemSymbol = pillars.day.stem.symbol
  const dayEnergy = pillars.day.stem.element
  const motherEnergy = motherElementOf(dayEnergy)

  const detail = []

  /*
   * K-UPFATE Strength Engine v4
   *
   * Day Master strength is separated into:
   *
   * 1. Deukryeong (得令) : seasonal/month command
   * 2. Deukji     (得地) : roots in earthly branches
   * 3. Deukse     (得勢) : support from heavenly stems
   *
   * Maximum structural score = 100.
   *
   * Important:
   * hidden stems are NOT scored once as ordinary energy
   * and again as a bonus. This removes the previous
   * double-counting problem.
   */

  let deukryeong = 0
  let deukji = 0
  let deukse = 0

  // --------------------------------------------------
  // 1. 得令 - MONTH COMMAND (maximum 40)
  // --------------------------------------------------

  const monthBranch = pillars.month.branch
  const monthHse = hiddenSkyEnergy[monthBranch.index] || []

  if (monthBranch.element === dayEnergy) {
    deukryeong += 32
    detail.push("Deukryeong: month branch same element +32")
  } else if (monthBranch.element === motherEnergy) {
    deukryeong += 24
    detail.push("Deukryeong: month branch generates Day Master +24")
  }

  // Month hidden stems give secondary seasonal support.
  // Keep this small because the month branch itself
  // has already received the main seasonal weight.

  if (monthHse.includes(dayStemSymbol)) {
    deukryeong += 6
    detail.push("Deukryeong: Day Stem rooted in month hidden stems +6")
  } else {
    const hasMother = monthHse.some(
      (s) => elementOfStemSymbol(s) === motherEnergy
    )

    if (hasMother) {
      deukryeong += 4
      detail.push("Deukryeong: mother element in month hidden stems +4")
    }
  }

  // 건록 is meaningful but must not dominate the score.
  if (GEONROK_BRANCH[dayStemSymbol] === monthBranch.index) {
    deukryeong += 2
    detail.push("Deukryeong: Geonrok month +2")
  }

  deukryeong = Math.min(40, deukryeong)

  // --------------------------------------------------
  // 2. 得地 - EARTHLY ROOTS (maximum 35)
  // --------------------------------------------------

  const ROOT_WEIGHTS = {
    day: 12,
    month: 10,
    hour: 8,
    year: 5
  }

  let tonggeunCount = 0

  for (const key of ["year", "month", "day", "hour"]) {
    const branch = pillars[key].branch
    const hse = hiddenSkyEnergy[branch.index] || []
    const rootWeight = ROOT_WEIGHTS[key]

    if (hse.includes(dayStemSymbol)) {
      deukji += rootWeight
      tonggeunCount++
      detail.push(`Deukji: ${key} direct root +${rootWeight}`)
      continue
    }

    const sameElementRoot = hse.some(
      (s) => elementOfStemSymbol(s) === dayEnergy
    )

    if (sameElementRoot) {
      const v = rootWeight * 0.7
      deukji += v
      tonggeunCount++
      detail.push(`Deukji: ${key} same-element root +${v}`)
      continue
    }

    const motherRoot = hse.some(
      (s) => elementOfStemSymbol(s) === motherEnergy
    )

    if (motherRoot) {
      const v = rootWeight * 0.4
      deukji += v
      detail.push(`Deukji: ${key} generating root +${v}`)
    }
  }

  deukji = Math.min(35, deukji)

  // --------------------------------------------------
  // 3. 得勢 - HEAVENLY STEM SUPPORT (maximum 25)
  // --------------------------------------------------

  const STEM_WEIGHTS = {
    month: 9,
    hour: 7,
    year: 6
  }

  let peerCount = 0

  for (const key of ["year", "month", "hour"]) {
    const stemEnergy = pillars[key].stem.element
    const weight = STEM_WEIGHTS[key]

    if (stemEnergy === dayEnergy) {
      deukse += weight
      peerCount++
      detail.push(`Deukse: ${key} heavenly peer +${weight}`)
    } else if (stemEnergy === motherEnergy) {
      const v = weight * 0.7
      deukse += v
      detail.push(`Deukse: ${key} resource support +${v}`)
    }
  }

  // Day stem itself is deliberately excluded.
  // It is the subject being measured, not supporting evidence.

  deukse = Math.min(25, deukse)

  // --------------------------------------------------
  // FINAL
  // --------------------------------------------------

  const rawValue = deukryeong + deukji + deukse
  const value = Number(Math.min(100, rawValue).toFixed(2))

  const lv = getStrengthLevel5(value)

  return {
    value,
    score: value,

    level: lv.level,
    koreanLevel: lv.koreanLevel,

    dayEnergy,
    motherEnergy,

    // This field remains for API compatibility.
    // Actual Five-Energy dominance is calculated separately.
    dominantEnergy: dayEnergy,

    monthBranchEnergy: monthBranch.element,

    climateMode: monthBranch.element === dayEnergy,

    structure: {
      deukryeong: Number(deukryeong.toFixed(2)),
      deukji: Number(deukji.toFixed(2)),
      deukse: Number(deukse.toFixed(2))
    },

    tonggeunCount,
    peerCount,

    method: "K-UPFATE Strength Engine v4",

    detail
  }
}

module.exports = { calculateDayStrength }
