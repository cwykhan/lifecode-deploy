"use strict"

const assert = require("node:assert/strict")
const test = require("node:test")
const { calculateUsefulEnergySet } = require("../engine/node/rules/usefulGodEngine")

// C 엔진의 지지 인덱스에 대응하는 원래 지지 오행.
const MONTH_ELEMENT = [
  "Water", "Earth", "Tree", "Tree", "Earth", "Fire",
  "Fire", "Earth", "Metal", "Metal", "Earth", "Water"
]
const CLIMATE_USEFUL = [
  "Fire", "Fire", "Metal", "Metal", "Metal", "Water",
  "Water", "Water", "Fire", "Fire", "Fire", "Fire"
]
const CHILD = {
  Tree: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Tree"
}

function run(dayEnergy, branchIndex, level = "Strong", climateMode = false) {
  return calculateUsefulEnergySet(
    { dayEnergy, motherEnergy: "Fire", level, climateMode },
    { month: { branch: { index: branchIndex, element: MONTH_ELEMENT[branchIndex] } } }
  )
}

// 12개 월지 모두 일간과 월지가 같을 때는 무조건 조후 우선.
for (let i = 0; i < 12; i++) {
  test(`월지 ${i}: 동일 오행이면 무조건 조후`, () => {
    const useful = CLIMATE_USEFUL[i]
    const actual = run(MONTH_ELEMENT[i], i, "Weak", false)
    assert.deepEqual(actual, {
      usefulEnergy: useful,
      supportingEnergy: CHILD[useful],
      usefulMethod: "Climate Useful Energy"
    })
  })
}

test("오행이 다르면 잘못 설정된 climateMode=true를 무시하고 신강 규칙", () => {
  assert.deepEqual(run("Earth", 8, "Strong", true), {
    usefulEnergy: "Metal", supportingEnergy: "Water",
    usefulMethod: "Strong Day Master: Output first, Wealth second"
  })
})

test("오행이 다를 때 신태강과 극신강도 동일 강약 분기", () => {
  for (const level of ["Very Strong", "Extremely Strong"]) {
    assert.equal(run("Earth", 8, level).usefulEnergy, "Metal")
  }
})

test("오행이 다를 때 신약은 인성 우선", () => {
  assert.deepEqual(run("Earth", 8, "Weak"), {
    usefulEnergy: "Fire", supportingEnergy: "Earth",
    usefulMethod: "Weak Day Master: Resource first, Peer second"
  })
})

test("오행이 다를 때 중화는 식상과 재성", () => {
  assert.deepEqual(run("Earth", 8, "Balanced"), {
    usefulEnergy: "Metal", supportingEnergy: "Water",
    usefulMethod: "Balanced Day Master: Output and Wealth flow"
  })
})

test("잘못된 월지 인덱스는 조용히 기본값으로 처리하지 않음", () => {
  assert.throws(() => calculateUsefulEnergySet(
    { dayEnergy: "Earth", level: "Strong" },
    { month: { branch: { index: 12, element: "Earth" } } }
  ), /Invalid month branch/)
})
