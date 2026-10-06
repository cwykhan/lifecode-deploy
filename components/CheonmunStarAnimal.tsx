
"use client"
import { starAnimalKorean } from "@/lib/starAnimalKorean"
import Txt from "@/components/TranslatedText"
import Bi from "@/components/BilingualText"

import { starAnimalProfiles } from "@/lib/starAnimalProfiles"


const branchName: Record<number, string> = {
  0: "Rat", 1: "Ox", 2: "Tiger", 3: "Rabbit", 4: "Dragon", 5: "Snake",
  6: "Horse", 7: "Goat", 8: "Monkey", 9: "Rooster", 10: "Dog", 11: "Pig"
}

const map: Record<number, any[]> = {
  4: [[1,6,"Azure Dragon","청룡","gak"],[7,12,"Golden Dragon","황금용","hang"]],
  3: [[1,4,"Earth Raccoon","너구리","ju"],[5,8,"Moon Rabbit","달토끼","bang"],[9,12,"Moon Fox","달여우","sim"]],
  2: [[1,6,"Fire Tiger","불호랑이","mi"],[7,12,"Water Leopard","물표범","ki"]],
  1: [[1,6,"Justice Haechi","해치","du"],[7,12,"Golden Ox","황소","woo"]],
  0: [[1,4,"Earth Bat","박쥐","yeo"],[5,8,"Sun Rat","쥐","hu"],[9,12,"Moon Swallow","제비","wui"]],
  11:[[1,6,"Fire Boar","불돼지","sil"],[7,12,"Water Otter","수달","beok"]],
  10:[[1,6,"Wood Wolf","늑대","kyu"],[7,12,"Loyal Dog","개","ru"]],
  9: [[1,4,"Earth Pheasant","꿩","we"],[5,8,"Sun Rooster","닭","myo"],[9,12,"Moon Crow","까마귀","pil"]],
  8: [[1,6,"Fire Monkey","불원숭이","ja"],[7,12,"Water Ape","물원숭이","sam"]],
  7: [[1,6,"Justice Hound","들개","jung"],[7,12,"Golden Goat","황금양","kui"]],
  6: [[1,4,"Earth Deer","노루","ryu"],[5,8,"Star Horse","태양말","sung"],[9,12,"Moon Deer","달사슴","jang"]],
  5: [[1,6,"Fire Serpent","불뱀","ik"],[7,12,"Water Earthworm","물지렁이","jin"]]
}


function fallback(name: string) {
  return {
    en: "You carry a distinct Korean star-animal pattern. It shows your instinctive rhythm, emotional style, and hidden behavioral tendency.",
    ko: `${name}의 별자리 기운은 본능적인 리듬, 감정 표현 방식, 숨은 행동 성향을 보여줍니다.`,
    career: "Your career path improves when your natural rhythm is used consciously.",
    wealth: "Your wealth pattern becomes stronger when timing and discipline are aligned.",
    relation: "Your relationship pattern becomes stable when trust and emotional balance are protected."
  }
}

export default function CheonmunStarAnimal({ result }: { result: any }) {
  const yearBranch = result?.pillars?.year?.branch?.index ?? 4
  const month = result?.input?.month ?? 9
  const item = (map[yearBranch] || []).find((x) => month >= x[0] && month <= x[1])

  if (!item) return null

  const [from, to, enName, koName, img] = item
  const p = starAnimalProfiles[koName]
  const pk = starAnimalKorean[koName]

  return (
    <div className="rounded-3xl border border-yellow-300/25 bg-white p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.45em] text-[#725b38]"><Bi en="Korean Astro Twenty-Eight Mansions" ko="한국 천문 28수" /></p>

      <div className="mt-6 grid gap-8 md:grid-cols-[180px_1fr] md:items-center">
        <div className="mx-auto grid h-40 w-40 place-items-center rounded-full border border-yellow-300/30 bg-[#faf3e6] p-3">
          <img src={`/star-animals/${img}.png`} alt={enName} className="h-32 w-32 object-contain" />
        </div>

        <div>
          <h2 className="text-5xl font-black text-[#725b38]">{enName}</h2>
          <p className="mt-2 text-2xl font-black text-[#986366]">{koName}</p>

          <p className="mt-5 text-lg leading-8 text-[#373341]">{p.en}</p>
          <p className="mt-3 text-base leading-7 text-[#6d6675]">{p.ko}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#e5dfea] bg-white p-4">
          <p className="text-xs uppercase tracking-widest text-[#6d6675]"><Bi en="Birth Animal" ko="태어난 해의 띠" /></p>
          <p className="mt-2 text-xl font-black text-[#725b38]"><Txt text={branchName[yearBranch]} /></p>
        </div>
        <div className="rounded-2xl border border-[#e5dfea] bg-white p-4">
          <p className="text-xs uppercase tracking-widest text-[#6d6675]"><Bi en="Birth Month" ko="태어난 달" /></p>
          <p className="mt-2 text-xl font-black text-[#725b38]">{month}</p>
        </div>
        <div className="rounded-2xl border border-[#e5dfea] bg-white p-4">
          <p className="text-xs uppercase tracking-widest text-[#6d6675]"><Bi en="Month Range" ko="해당 월 범위" /></p>
          <p className="mt-2 text-xl font-black text-[#725b38]">{from}-{to}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-yellow-300/15 bg-[#faf3e6] p-5">
          <p className="font-black text-[#725b38]"><Bi en="Career" ko="직업" /></p>
          <p className="mt-2 text-sm leading-6 text-[#6d6675]"><Bi en={p.career} ko={pk?.career || ""} /></p>
        </div>
        <div className="rounded-2xl border border-yellow-300/15 bg-[#faf3e6] p-5">
          <p className="font-black text-[#725b38]"><Bi en="Wealth" ko="재물" /></p>
          <p className="mt-2 text-sm leading-6 text-[#6d6675]"><Bi en={p.wealth} ko={pk?.wealth || ""} /></p>
        </div>
        <div className="rounded-2xl border border-yellow-300/15 bg-[#faf3e6] p-5">
          <p className="font-black text-[#725b38]"><Bi en="Relationship" ko="관계" /></p>
          <p className="mt-2 text-sm leading-6 text-[#6d6675]"><Bi en={p.relationship} ko={pk?.relationship || ""} /></p>
        </div>
      </div>
    </div>
  )
}
