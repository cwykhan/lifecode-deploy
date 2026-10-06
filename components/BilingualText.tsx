import type { ReactNode } from "react"
export default function BilingualText({ en, ko }: { en: ReactNode; ko: ReactNode }) {
  return <span className="bilingual"><span lang="en" className="bi-en">{en}</span><span lang="ko" className="bi-ko">{ko}</span></span>
}
