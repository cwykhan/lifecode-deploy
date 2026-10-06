"use client"
import type { FormEvent } from "react"
import Bi from "./BilingualText"
type Props={birthDate:string;birthTime:string;gender:string;loading:boolean;visitorCount:number;setBirthDate:(v:string)=>void;setBirthTime:(v:string)=>void;setGender:(v:string)=>void;decode:()=>void}
export default function Landing(p:Props){
 function submit(e:FormEvent){e.preventDefault();if(!p.loading)p.decode()}
 return <>
  <header className="site-header">
   <a href="/" className="brand" aria-label="K-UPFATE home / 홈"><span className="brand-mark" aria-hidden="true">K<span>/</span></span>K-UPFATE<span className="brand-dot">®</span></a>
   <nav aria-label="Main navigation / 주 메뉴"><a href="#discover"><Bi en="THE ORIGIN" ko="탄생의 코드"/></a><a href="#elements"><Bi en="FIVE ENERGIES" ko="다섯 가지 기운"/></a><a href="#reading" className="nav-reading"><Bi en="DECODE NOW ↗" ko="무료로 해독하기"/></a></nav>
  </header>
  <section className="hero-stage" id="discover">
   <div className="hero-visual" aria-hidden="true"><img src="/images/origin-hologram-v2.png" alt="" fetchPriority="high"/></div>
   <div className="sf-coordinate" aria-hidden="true">K–UPFATE / ORIGIN EXPLORER <span>01 — 05</span></div>
   <div className="hero-copy">
    <div className="eyebrow"><span className="status-dot"/><Bi en="ANCIENT WISDOM. A NEW INTERFACE." ko="오래된 지혜를, 미래의 언어로."/></div>
    <h1>DECODE<br/>YOUR <span>ORIGIN.</span><span lang="ko" className="hero-ko">당신의 탄생 코드를 해독하다.</span></h1>
    <p className="hero-description"><Bi en="Your birth is the starting point. Discover the patterns within — through Korean Saju and five elemental codes." ko="당신의 탄생에서 시작하는 이야기. 한국 전통 사주와 다섯 가지 코드로 내면의 패턴을 발견하세요."/></p>
    <a href="#reading" className="hero-cta"><Bi en="REVEAL MY CODE" ko="나의 코드 발견하기"/><span aria-hidden="true">↗</span></a>
    <p className="hero-assurance"><Bi en="FREE READING · NO SIGN-UP · NO CARD" ko="무료 분석 · 회원가입 없이 · 카드 등록 없이"/></p>
   </div>
   <div className="visual-caption"><span className="caption-line"/><Bi en="ONE ORIGIN. ENDLESS PERSPECTIVES." ko="하나의 탄생, 무한한 해석의 시선."/></div>
  </section>
  <section className="code-strip" id="elements" aria-label="Five energy codes / 다섯 기운의 코드">
   <div className="code-strip-title"><Bi en={"FIVE ENERGIES.\nYOUR SIGNATURE."} ko="다섯 기운이 만드는 나만의 시그니처"/></div>
   {[["T","TREE","성장 · 확장","tree"],["F","FIRE","열정 · 표현","fire"],["E","EARTH","안정 · 축적","earth"],["M","METAL","판단 · 정제","metal"],["W","WATER","지혜 · 유연함","water"]].map(([code,en,ko,tone])=><div className={`code-token ${tone}`} key={code}><strong>{code}</strong><Bi en={en} ko={ko}/></div>)}
  </section>
  <section className="reading-section" id="reading">
   <div className="reading-heading"><p className="section-index">01 / BEGIN YOUR READING</p><h2>YOUR MOMENT.<br/><span>YOUR CODE.</span></h2><p lang="ko">당신이 태어난 순간, 당신만의 코드.</p><p className="reading-summary"><Bi en="Enter your birth details to explore your elemental signature." ko="생년월일과 시간을 입력하고 나의 기운을 확인하세요."/></p><span className="form-free"><Bi en="FREE TO EXPLORE" ko="무료로 시작하세요"/></span></div>
   <form className="reading-card" onSubmit={submit}>
    <div className="card-topline"><Bi en="BIRTH COORDINATES" ko="탄생 정보 입력"/><span className="live-indicator" aria-hidden="true">● READY</span></div>
    <div className="form-fields"><div><label className="field-label" htmlFor="birth-date"><Bi en="Birth date" ko="생년월일 · 양력"/></label><input id="birth-date" type="date" required value={p.birthDate} onChange={e=>p.setBirthDate(e.target.value)}/></div><div><label className="field-label" htmlFor="birth-time"><Bi en="Birth time" ko="태어난 시간"/></label><input id="birth-time" type="time" required value={p.birthTime} onChange={e=>p.setBirthTime(e.target.value)}/></div></div>
    <fieldset className="gender-field"><legend className="field-label"><Bi en="Gender" ko="성별"/></legend><div className="gender-options"><button type="button" aria-pressed={p.gender==="male"} onClick={()=>p.setGender("male")}><Bi en="Male" ko="남성"/></button><button type="button" aria-pressed={p.gender==="female"} onClick={()=>p.setGender("female")}><Bi en="Female" ko="여성"/></button></div></fieldset>
    <button type="submit" className="reading-submit" disabled={p.loading} aria-busy={p.loading}><Bi en={p.loading?"DECODING YOUR ORIGIN…":"INITIATE MY READING"} ko={p.loading?"탄생 코드를 분석하고 있습니다…":"내 사주 무료 분석 시작하기"}/><span aria-hidden="true">↗</span></button>
    <p className="privacy-note"><Bi en="Your latest reading is saved in this browser for your return." ko="다시 확인할 수 있도록 최근 분석 결과를 이 브라우저에 저장합니다."/></p>
   </form>
  </section>
  <section className="discovery-strip" aria-label="What you can explore / 알아볼 수 있는 것">{[["01","IDENTITY","나의 본질","Understand the energy behind your character.","성향의 바탕이 되는 기운을 알아보세요.","lavender"],["02","DIRECTION","일과 재능","Explore how you work, create, and grow.","일하고, 만들고, 성장하는 방식을 살펴보세요.","mint"],["03","CONNECTION","사람과 관계","Discover your patterns of connection.","사람들과 관계를 맺는 패턴을 발견하세요.","peach"]].map(([n,en,ko,desc,descKo,tone])=><article className={`discovery-item ${tone}`} key={n}><span className="feature-number">{n} /</span><h3><Bi en={en} ko={ko}/></h3><p><Bi en={desc} ko={descKo}/></p><span className="feature-arrow" aria-hidden="true">↗</span></article>)}</section>
  <p className="cultural-note"><Bi en="Korean Saju, reimagined for self-discovery. A cultural interpretation, not a scientific prediction." ko="나를 발견하는 새로운 한국 사주. 과학적 예측이 아닌 전통문화에 기반한 해석입니다."/></p>
 </>
}
