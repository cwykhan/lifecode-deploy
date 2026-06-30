const PILLAR_WEIGHTS = {
  month: 35,
  day: 20,
  hour: 30,
  year: 15
}

const GEONROK_BRANCH = {
  T: 2, t: 3,
  F: 5, f: 6,
  E: 5, e: 6,
  M: 8, m: 9,
  W: 11, w: 0
}

function getStrengthLevel5(value) {
  if (value >= 60) return { level: "Very Strong", koreanLevel: "극신강" }
  if (value >= 40) return { level: "Strong", koreanLevel: "신강" }
  if (value >= 30) return { level: "Balanced", koreanLevel: "중화" }
  if (value >= 20) return { level: "Weak", koreanLevel: "신약" }
  return { level: "Very Weak", koreanLevel: "극신약" }
}

function calculateDayStrength({ pillars, hiddenSkyEnergy, elementOfStemSymbol, motherElementOf }) {
  const dayStemSymbol = pillars.day.stem.symbol
  const dayEnergy = pillars.day.stem.element
  const motherEnergy = motherElementOf(dayEnergy)

  const detail = []
  const score = { value: 0 }

  const addSupport = (element, amount, label) => {
    if (element === dayEnergy) {
      score.value += amount
      detail.push(`${label}: direct root +${Number(amount.toFixed(2))}`)
    }

    if (element === motherEnergy) {
      const v = amount * 0.7
      score.value += v
      detail.push(`${label}: generating support +${Number(v.toFixed(2))}`)
    }
  }

  const branchHasDayStem = (branchIndex) =>
    (hiddenSkyEnergy[branchIndex] || []).includes(dayStemSymbol)

  const addPillar = (key, weight) => {
    const p = pillars[key]

    addSupport(p.stem.element, weight * 0.4, `${key} stem`)
    addSupport(p.branch.element, weight * 0.4, `${key} branch`)

    const hse = hiddenSkyEnergy[p.branch.index] || []
    const each = hse.length ? (weight * 0.2) / hse.length : 0

    for (const stemSymbol of hse) {
      addSupport(elementOfStemSymbol(stemSymbol), each, `${key} hidden stem`)
    }
  }

  const month = pillars.month
  addSupport(month.branch.element, PILLAR_WEIGHTS.month * 0.7, "month branch")

  const monthHse = hiddenSkyEnergy[month.branch.index] || []
  const monthEach = monthHse.length ? (PILLAR_WEIGHTS.month * 0.3) / monthHse.length : 0

  for (const stemSymbol of monthHse) {
    addSupport(elementOfStemSymbol(stemSymbol), monthEach, "month hidden stem")
  }

  addPillar("day", PILLAR_WEIGHTS.day)
  addPillar("hour", PILLAR_WEIGHTS.hour)
  addPillar("year", PILLAR_WEIGHTS.year)

  const bonus = {
    dayHiddenStem: 0,
    monthHiddenStem: 0,
    geonrok: 0,
    tonggeun: 0,
    heavenlyPeer: 0,
    deukryeong: 0
  }

  if (branchHasDayStem(pillars.day.branch.index)) {
    bonus.dayHiddenStem = 10
    detail.push("bonus: day branch contains Day Stem +10")
  }

  if (branchHasDayStem(pillars.month.branch.index)) {
    bonus.monthHiddenStem = 10
    detail.push("bonus: month branch hidden stem contains Day Stem +10")
  }

  if (GEONROK_BRANCH[dayStemSymbol] === pillars.month.branch.index) {
    bonus.geonrok = 10
    detail.push("bonus: Geonrok in month branch +10")
  }

  if (pillars.month.branch.element === dayEnergy) {
    bonus.deukryeong = 15
    detail.push("bonus: seasonal command acquired +15")
  }

  const tonggeunCount = ["year", "month", "day", "hour"]
    .filter((key) => branchHasDayStem(pillars[key].branch.index)).length

  bonus.tonggeun =
    tonggeunCount >= 3 ? 8 :
    tonggeunCount === 2 ? 5 :
    tonggeunCount === 1 ? 3 : 0

  if (bonus.tonggeun) {
    detail.push(`bonus: Tonggeun ${tonggeunCount} root(s) +${bonus.tonggeun}`)
  }

  const peerCount = ["year", "month", "hour"]
    .filter((key) => pillars[key].stem.element === dayEnergy).length

  bonus.heavenlyPeer = Math.min(6, peerCount * 3)

  if (bonus.heavenlyPeer) {
    detail.push(`bonus: heavenly peer support +${bonus.heavenlyPeer}`)
  }

  const bonusTotal = Object.values(bonus).reduce((a, b) => a + b, 0)
  const value = Number((score.value + bonusTotal).toFixed(2))
  const lv = getStrengthLevel5(value)

  return {
    value,
    score: value,
    level: lv.level,
    koreanLevel: lv.koreanLevel,
    dayEnergy,
    motherEnergy,
    dominantEnergy: dayEnergy,
    monthBranchEnergy: pillars.month.branch.element,
    climateMode: pillars.month.branch.element === dayEnergy,
    pillarWeight: PILLAR_WEIGHTS,
    bonus,
    bonusTotal,
    tonggeunCount,
    method: "K-UPFATE Strength Engine v3",
    detail
  }
}

module.exports = { calculateDayStrength }
