"use client"

const branchName: Record<number, string> = {
  0: "Rat", 1: "Ox", 2: "Tiger", 3: "Rabbit", 4: "Dragon", 5: "Snake",
  6: "Horse", 7: "Goat", 8: "Monkey", 9: "Rooster", 10: "Dog", 11: "Pig"
}

const map: Record<number, any[]> = {
  4: [[1,6,"청룡","角木蛟","Azure Dragon"],[7,12,"황금용","亢金龍","Golden Dragon"]],
  3: [[1,4,"토리","氐土貉","Earth Raccoon"],[5,8,"달토끼","房日兔","Moon Rabbit"],[9,12,"여우","心月狐","Moon Fox"]],
  2: [[1,6,"호랑이","尾火虎","Fire Tiger"],[7,12,"표범","箕水豹","Water Leopard"]],

  1: [[1,6,"해치","斗木獬","Justice Haechi"],[7,12,"우공","牛金牛","Golden Ox"]],
  0: [[1,4,"박쥐","女土蝠","Earth Bat"],[5,8,"쥐","虛日鼠","Sun Rat"],[9,12,"제비","危月燕","Moon Swallow"]],
  11:[[1,6,"돼지","室火猪","Fire Boar"],[7,12,"수달","壁水貐","Water Otter"]],

  10:[[1,6,"늑대","奎木狼","Wood Wolf"],[7,12,"개","婁金狗","Loyal Dog"]],
  9: [[1,4,"꿩","胃土雉","Earth Pheasant"],[5,8,"닭","昴日雞","Sun Rooster"],[9,12,"까마귀","畢月烏","Moon Crow"]],
  8: [[1,6,"후원숭이","觜火猴","Fire Monkey"],[7,12,"원숭이","參水猿","Water Ape"]],

  7: [[1,6,"들개","井木犴","Justice Hound"],[7,12,"양","鬼金羊","Golden Goat"]],
  6: [[1,4,"노루","柳土獐","Earth Deer"],[5,8,"말","星日馬","Star Horse"],[9,12,"사슴","張月鹿","Moon Deer"]],
  5: [[1,6,"구렁이","翼火蛇","Fire Serpent"],[7,12,"지렁이","軫水蚓","Water Earthworm"]]
}

export default function CheonmunStarAnimal({ result }: { result: any }) {
  const yearBranch = result?.pillars?.year?.branch?.index ?? 4
  const month = result?.input?.month ?? 9
  const item = (map[yearBranch] || []).find((x) => month >= x[0] && month <= x[1])

  if (!item) return null

  const [from, to, ko, hanja, en] = item

  return (
    <div className="rounded-3xl border border-yellow-300/25 bg-black/70 p-8 shadow-[0_0_70px_rgba(255,215,120,0.12)]">
      <p className="text-sm uppercase tracking-[0.45em] text-yellow-300">
        Korean Star Animal
      </p>

      <h2 className="mt-4 text-5xl font-black text-yellow-100">{ko}</h2>
      <p className="mt-2 text-3xl font-black text-white">{hanja}</p>
      <p className="mt-4 text-xl font-bold text-red-200">{en}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">Birth Animal</p>
          <p className="mt-2 text-xl font-black text-yellow-100">{branchName[yearBranch]}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">Birth Month</p>
          <p className="mt-2 text-xl font-black text-yellow-100">{month}월</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">Month Range</p>
          <p className="mt-2 text-xl font-black text-yellow-100">{from}-{to}월</p>
        </div>
      </div>

      <p className="mt-6 text-lg leading-8 text-gray-300">
        This signal follows the Cheonmunryucho-style Korean 28 Star Mansion animal division.
        In this version, K-UPFATE applies the system using birth year animal and solar birth month.
      </p>
    </div>
  )
}
