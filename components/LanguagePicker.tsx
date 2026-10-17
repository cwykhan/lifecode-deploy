"use client"
import { useSyncExternalStore } from "react"
const subscribe=(cb:()=>void)=>{window.addEventListener("kupfate-language-change",cb);return ()=>window.removeEventListener("kupfate-language-change",cb)}
const getSnapshot=()=>window.localStorage.getItem("kupfate-language")||"en"
const getServerSnapshot=()=>"en"
export default function LanguagePicker(){
 const lang=useSyncExternalStore(subscribe,getSnapshot,getServerSnapshot)
 const choose=(next:string)=>{localStorage.setItem("kupfate-language",next);document.documentElement.lang=next;window.dispatchEvent(new Event("kupfate-language-change"))}
 return <div className="kupfate-language-switch" role="group" aria-label="Language / 언어 / Idioma">{([["en","EN"],["ko","한국어"],["es","ES"]] as const).map(([key,label])=><button key={key} type="button" aria-pressed={lang===key} onClick={()=>choose(key)}>{label}</button>)}</div>
}
