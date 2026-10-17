"use client"
import type { ReactNode } from "react"
import { useSyncExternalStore } from "react"
import { spanishTranslations } from "./spanishTranslations"
const subscribe=(cb:()=>void)=>{window.addEventListener("kupfate-language-change",cb);return ()=>window.removeEventListener("kupfate-language-change",cb)}
const getSnapshot=()=>window.localStorage.getItem("kupfate-language")||"en"
const getServerSnapshot=()=>"en"
export default function BilingualText({en,ko,es}:{en:ReactNode;ko:ReactNode;es?:ReactNode}){
 const lang=useSyncExternalStore(subscribe,getSnapshot,getServerSnapshot)
 if(lang==="es")return <span className="bilingual"><span lang="es" className="bi-en">{es??(typeof en==="string"?(spanishTranslations[en]??en):en)}</span></span>
 if(lang==="ko")return <span className="bilingual"><span lang="ko" className="bi-en">{ko}</span></span>
 return <span className="bilingual"><span lang="en" className="bi-en">{en}</span><span lang="ko" className="bi-ko">{ko}</span></span>
}
