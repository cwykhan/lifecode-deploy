"use client"

const stems = ["T","t","F","f","E","e","M","m","W","w"]
const branches = ["w","e","T","t","E","F","f","e","M","m","E","W"]

const stemName: Record<string,string> = {
  T:"Sunlit Jupiter", t:"Moonlit Jupiter",
  F:"Sunlit Mars", f:"Moonlit Mars",
  E:"Sunlit Earth", e:"Moonlit Earth",
  M:"Sunlit Venus", m:"Moonlit Venus",
  W:"Sunlit Mercury", w:"Moonlit Mercury"
}

const branchName: Record<string,string> = {
  w:"Rat Field", e:"Earth Field", T:"Tiger Field", t:"Rabbit Field",
  E:"Dragon/Dog Field", F:"Snake Field", f:"Horse Field",
  M:"Monkey Field", m:"Rooster Field", W:"Pig Field"
}

const elementOf: Record<string,string> = {
  T:"Tree", t:"Tree",
  F:"Fire", f:"Fire",
  E:"Earth", e:"Earth",
  M:"Metal", m:"Metal",
  W:"Water", w:"Water"
}

function yearPillar(year: number) {
  // 2026 = Ff 기준
  const diff = year - 2026
  const stemIndex = (2 + diff + 1000) % 10
  const branchIndex = (6 + diff + 1200) % 12
  return {
    year,
    stem: stems[stemIndex],
    branch: branches[branchIndex]
  }
}

function scoreYear(result: any, stem: string, branch: string) {
  const useful = result?.usefulEnergy || "Fire"
  const dominant = result?.strength?.dominantEnergy || "Earth"

  const stemElement = elementOf[stem]
  const branchElement = elementOf[branch]

  let score = 55

  if (stemElement === useful) score += 18
  if (branchElement === useful) score += 12

  if (stemElement === dominant) score += 8
  if (branchElement === dominant) score += 5

  if (stemElement !== useful && branchElement !== useful) score -= 5

  return Math.max(35, Math.min(95, score))
}

export default function AnnualFortuneChart({ result }: { result:any }) {
  const years = Array.from({ length: 10 }, (_, i) => yearPillar(2026 + i))

  return (
    <div className="rounded-3xl border border-orange-300/20 bg-black/70 p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-orange-200">
        10-Year Annual Fortune Flow
      </p>

      <h3 className="mt-4 text-4xl font-black text-orange-100">
        Year-by-Year Energy Forecast
      </h3>

      <p className="mt-4 text-lg leading-8 text-gray-300">
        This chart shows the next 10 annual energies, starting from 2026.
        Each year combines Sky Energy and Earth Field movement.
      </p>

      <div className="mt-8 space-y-5">
        {years.map((y) => {
          const score = scoreYear(result, y.stem, y.branch)

          return (
            <div key={y.year} className="rounded-2xl border border-white/10 bg-black/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-black text-orange-100">
                    {y.year} · {y.stem}{y.branch}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    {stemName[y.stem]} + {branchName[y.branch]}
                  </p>
                </div>

                <p className="text-3xl font-black text-yellow-200">
                  {score}
                </p>
              </div>

              <div className="mt-4 h-4 rounded-full bg-white/10">
                <div
                  className="h-4 rounded-full bg-orange-300"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
