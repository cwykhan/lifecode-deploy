
const ROOT_WEIGHTS = {
  day: 12,
  month: 10,
  hour: 8,
  year: 5
}

const STEM_WEIGHTS = {
  month: 9,
  hour: 7,
  year: 6
}

const GEONROK_BRANCH = {
  T: 2, t: 3,
  F: 5, f: 6,
  E: 5, e: 6,
  M: 8, m: 9,
  W: 11, w: 0
}

function getStrengthLevel(value) {
  if (value >= 65) {
    return {
      level: "Extremely Strong",
      koreanLevel: "극신강"
    }
  }

  if (value >= 55) {
    return {
      level: "Very Strong",
      koreanLevel: "신태강"
    }
  }

  if (value >= 45) {
    return {
      level: "Strong",
      koreanLevel: "신강"
    }
  }

  if (value >= 38) {
    return {
      level: "Balanced",
      koreanLevel: "중화"
    }
  }

  return {
    level: "Weak",
    koreanLevel: "신약"
  }
}

function calculateDayStrength({
  pillars,
  hiddenSkyEnergy,
  elementOfStemSymbol,
  motherElementOf,
  fiveEnergy
}) {
  const dayStemSymbol = pillars.day.stem.symbol
  const dayEnergy = pillars.day.stem.element
  const motherEnergy = motherElementOf(dayEnergy)

  if (!motherEnergy) {
    throw new Error("Mother energy not found")
  }

  const ratio = fiveEnergy?.ratio

  if (!ratio) {
    throw new Error("Five energy ratio missing")
  }

  const peerRatio = ratio[dayEnergy]
  const resourceRatio = ratio[motherEnergy]

  if (
    !Number.isFinite(peerRatio) ||
    !Number.isFinite(resourceRatio)
  ) {
    throw new Error("Invalid five energy ratio")
  }

  const supportRatio = Number(
    (peerRatio + resourceRatio).toFixed(2)
  )

  const lv = getStrengthLevel(supportRatio)

  const detail = []

  let deukryeong = 0
  let deukji = 0
  let deukse = 0

  // 1. 得令: 월령의 지원
  const monthBranch = pillars.month.branch
  const monthHse =
    hiddenSkyEnergy[monthBranch.index] || []

  if (monthBranch.element === dayEnergy) {
    deukryeong += 32
    detail.push("Deukryeong: same month element +32")
  } else if (monthBranch.element === motherEnergy) {
    deukryeong += 24
    detail.push("Deukryeong: generating month element +24")
  }

  if (monthHse.includes(dayStemSymbol)) {
    deukryeong += 6
    detail.push("Deukryeong: direct month root +6")
  } else if (
    monthHse.some(
      s => elementOfStemSymbol(s) === motherEnergy
    )
  ) {
    deukryeong += 4
    detail.push("Deukryeong: resource month root +4")
  }

  if (
    GEONROK_BRANCH[dayStemSymbol] ===
    monthBranch.index
  ) {
    deukryeong += 2
    detail.push("Deukryeong: Geonrok +2")
  }

  deukryeong = Math.min(40, deukryeong)

  // 2. 得地: 지지 통근
  let tonggeunCount = 0

  for (const key of ["year", "month", "day", "hour"]) {
    const branch = pillars[key].branch
    const hse = hiddenSkyEnergy[branch.index] || []
    const weight = ROOT_WEIGHTS[key]

    if (hse.includes(dayStemSymbol)) {
      deukji += weight
      tonggeunCount++
      detail.push(`Deukji: ${key} direct root +${weight}`)
      continue
    }

    if (
      hse.some(
        s => elementOfStemSymbol(s) === dayEnergy
      )
    ) {
      const v = weight * 0.7
      deukji += v
      tonggeunCount++
      detail.push(`Deukji: ${key} peer root +${v}`)
      continue
    }

    if (
      hse.some(
        s => elementOfStemSymbol(s) === motherEnergy
      )
    ) {
      const v = weight * 0.4
      deukji += v
      detail.push(`Deukji: ${key} resource root +${v}`)
    }
  }

  deukji = Math.min(35, deukji)

  // 3. 得勢: 천간의 지원
  let peerCount = 0

  for (const key of ["year", "month", "hour"]) {
    const stemEnergy = pillars[key].stem.element
    const weight = STEM_WEIGHTS[key]

    if (stemEnergy === dayEnergy) {
      deukse += weight
      peerCount++
      detail.push(`Deukse: ${key} peer +${weight}`)
    } else if (stemEnergy === motherEnergy) {
      const v = weight * 0.7
      deukse += v
      detail.push(`Deukse: ${key} resource +${v}`)
    }
  }

  deukse = Math.min(25, deukse)

  const structuralScore = Number(
    Math.min(
      100,
      deukryeong + deukji + deukse
    ).toFixed(2)
  )

  detail.push(
    `Peer energy: ${peerRatio}%`,
    `Resource energy: ${resourceRatio}%`,
    `Combined support: ${supportRatio}%`,
    `Strength classification: ${lv.koreanLevel}`
  )

  return {
    value: supportRatio,
    score: supportRatio,

    level: lv.level,
    koreanLevel: lv.koreanLevel,

    dayEnergy,
    motherEnergy,

    dominantEnergy: dayEnergy,

    monthBranchEnergy: monthBranch.element,
    climateMode:
      monthBranch.element === dayEnergy,

    support: {
      peerEnergy: dayEnergy,
      peerRatio,
      resourceEnergy: motherEnergy,
      resourceRatio,
      totalRatio: supportRatio
    },

    structure: {
      deukryeong: Number(deukryeong.toFixed(2)),
      deukji: Number(deukji.toFixed(2)),
      deukse: Number(deukse.toFixed(2)),
      structuralScore
    },

    tonggeunCount,
    peerCount,

    method: "K-UPFATE Strength Engine v5",

    detail
  }
}

module.exports = {
  calculateDayStrength,
  getStrengthLevel
}
