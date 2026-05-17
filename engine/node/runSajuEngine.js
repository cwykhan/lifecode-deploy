const { execFileSync } = require('node:child_process');
const path = require('node:path');

const enginePath = path.resolve(__dirname, '../cal20000/saju-cli');

const HSE = {
  w: ['W', 'w'],
  t: ['T', 't'],
  f: ['F', 'f', 'e'],
  m: ['M', 'm'],
  W: ['E', 'T', 'W'],
  e: ['w', 'm', 'e'],
  T: ['E', 'F', 'T'],
  E: ['t', 'w', 'E'],
  F: ['E', 'M', 'F'],
  M: ['E', 'W', 'M']
};

const ELEMENT = {
  T: 'Tree', t: 'Tree',
  F: 'Fire', f: 'Fire',
  E: 'Earth', e: 'Earth',
  M: 'Metal', m: 'Metal',
  W: 'Water', w: 'Water'
};

const CONTROLS = {
  Tree: 'Earth',
  Earth: 'Water',
  Water: 'Fire',
  Fire: 'Metal',
  Metal: 'Tree'
};

const CONTROLLED_BY = {
  Tree: 'Metal',
  Fire: 'Water',
  Earth: 'Tree',
  Metal: 'Fire',
  Water: 'Earth'
};

function assertInt(name, value, min, max) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max) {
    throw new Error(`${name} must be an integer from ${min} to ${max}`);
  }
  return n;
}

function addScore(score, symbol, value) {
  const element = ELEMENT[symbol];
  if (!element) return;
  score[element] += value;
}

function enrichWithHse(pillar) {
  const branchSymbol = pillar.branch.symbol;
  const hidden = HSE[branchSymbol] || [];
  return {
    ...pillar,
    branch: {
      ...pillar.branch,
      hiddenSkyEnergy: hidden.map((symbol) => ({ symbol, element: ELEMENT[symbol] }))
    }
  };
}

function calculateFiveEnergy(pillars) {
  const score = { Tree: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };

  // 1차 웹서비스용 가중치: 천간 10점, 지지 본기 15점, HSE 각 3점.
  // 이후 사용자가 확정한 월지/일간 중심 신강 로직으로 더 세분화할 자리입니다.
  for (const pillar of Object.values(pillars)) {
    addScore(score, pillar.stem.symbol, 10);
    addScore(score, pillar.branch.symbol, 15);
    for (const h of pillar.branch.hiddenSkyEnergy) addScore(score, h.symbol, 3);
  }

  const total = Object.values(score).reduce((a, b) => a + b, 0);
  const ratio = Object.fromEntries(
    Object.entries(score).map(([k, v]) => [k, Number(((v / total) * 100).toFixed(2))])
  );

  return { score, ratio, total };
}

function judgeStrength(fiveEnergy) {
  const strongest = Object.entries(fiveEnergy.ratio).sort((a, b) => b[1] - a[1])[0];
  const value = strongest[1];
  if (value >= 40) return { level: 'Strong', dominantEnergy: strongest[0], value };
  if (value >= 30) return { level: 'Balance', dominantEnergy: strongest[0], value };
  return { level: 'Weak', dominantEnergy: strongest[0], value };
}

function deriveUsefulEnergy(strength) {
  return CONTROLLED_BY[strength.dominantEnergy];
}

function runSajuEngine(input) {
  const year = assertInt('year', input.year, -9999, 9999);
  const month = assertInt('month', input.month, 1, 12);
  const day = assertInt('day', input.day, 1, 31);
  const hour = assertInt('hour', input.hour, 0, 23);
  const minute = assertInt('minute', input.minute ?? input.min ?? 0, 0, 59);

  let stdout;
  try {
    stdout = execFileSync(enginePath, [year, month, day, hour, minute].map(String), {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    throw new Error(`C engine failed: ${error.stderr?.toString?.() || error.message}`);
  }

  const raw = JSON.parse(stdout);
  const pillars = Object.fromEntries(
    Object.entries(raw.pillars).map(([name, pillar]) => [name, enrichWithHse(pillar)])
  );
  const fiveEnergy = calculateFiveEnergy(pillars);
  const strength = judgeStrength(fiveEnergy);

  return {
    ...raw,
    pillars,
    fiveEnergy,
    strength,
    usefulEnergy: deriveUsefulEnergy(strength),
    meta: {
      source: 'CAL20000 C engine via Node.js bridge',
      notation: 'LifeCode English Saju notation',
      hse: 'hidden sky energy'
    }
  };
}

if (require.main === module) {
  const [year, month, day, hour, minute = '0'] = process.argv.slice(2);
  const result = runSajuEngine({ year, month, day, hour, minute });
  console.log(JSON.stringify(result, null, 2));
}

module.exports = { runSajuEngine };
