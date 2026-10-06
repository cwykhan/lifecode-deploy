import Bi from "./BilingualText"
import {ko} from "@/lib/korean"
export default function BilingualReport({report,result}:{report:string;result:any}) {
 const dominant=result?.strength?.dominantEnergy || "Earth", useful=result?.usefulEnergy || "Metal", strength=result?.strength?.level || "Balance"
 const d=ko(dominant),u=ko(useful),s=ko(strength)||strength
 const translations:Record<string,string>={
 "EXPLORER REPORT":"탐색 리포트","CORE STRUCTURE":"핵심 구조","CAREER PATTERN":"직업 성향","WEALTH PATTERN":"재물 성향","RELATIONSHIP DYNAMICS":"관계의 특징","HEALTH SIGNAL":"건강 관련 기운","FIRST ACTION PLAN":"첫 실천 방향",
 [`Your LifeCode shows a ${strength} structure centered around ${dominant} Energy.`]:`라이프코드는 ${d}의 기운을 중심으로 ${s} 구조를 나타냅니다.`,
 [`Your Useful Energy is ${useful}. This is the correction key that helps balance your pattern.`]:`도움이 되는 기운은 ${u}입니다. 기운의 균형을 살펴보는 핵심입니다.`,
 "You perform best when your natural rhythm is respected.":"타고난 리듬을 존중할 때 능력을 잘 발휘합니다.",
 "Your chart favors steady skill development, repeated refinement, and long-term expertise.":"꾸준한 기술 개발, 반복적인 개선과 장기적인 전문성 축적을 권합니다.",
 "Money improves when decisions are consistent, timed, and structured.":"일관성 있고 시기를 고려한 체계적인 판단이 재물 관리에 도움이 됩니다.",
 [`Your wealth pattern improves when ${useful} Energy is used intentionally.`]:`${u}의 기운을 의식적으로 활용하는 방향을 살펴보세요.`,
 "A good relationship is not simply intense.":"좋은 관계는 강렬함만으로 결정되지 않습니다.","It must help your energy become balanced.":"서로의 기운이 균형을 이루도록 돕는 것이 중요합니다.",
 "This is not medical advice.":"의학적인 조언이 아닙니다.","Your chart shows an energy tendency. The goal is rhythm, regulation, and balance.":"명식은 기운의 경향을 보여줍니다. 리듬, 조절과 균형을 돌아보는 자료로 활용하세요.",
 "1. Focus on one skill that compounds over time.":"1. 시간이 지날수록 가치가 쌓이는 기술 하나에 집중하세요.","2. Reduce unnecessary commitments.":"2. 불필요한 약속과 부담을 줄여보세요.","3. Build assets before expansion.":"3. 확장하기 전에 자산과 기반을 쌓으세요.",[`4. Use ${useful} Energy intentionally.`]:`4. ${u}의 기운을 의식적으로 활용해 보세요.`,
 "NAVIGATOR REPORT":"방향 리포트",[`Your chart shows a ${strength} LifeCode pattern centered around ${dominant} Energy.`]:`명식은 ${d}의 기운을 중심으로 ${s}의 라이프코드 패턴을 보여줍니다.`,
 "HIDDEN TALENT MAP":"내면의 재능","Your hidden talent appears when pressure increases.":"압박이 커질 때 숨은 재능이 드러날 수 있습니다.","HIDDEN RISK MAP":"내면의 취약점","Your main risk is repetition.":"같은 패턴의 반복에 유의하세요.","USEFUL ENERGY CORRECTION":"용신을 통한 균형",[`Useful Energy: ${useful}`]:`도움이 되는 기운: ${u}`,
 [`When ${useful} Energy is active, decisions become clearer.`]:`${u}의 기운을 활용하는 관점에서 판단을 돌아보세요.`,"10-YEAR TREND PREVIEW":"10년 흐름 미리보기",[`If ${useful} Energy is added, your dominant pattern becomes direction.`]:`${u}의 기운을 더해 두드러진 성향에 방향을 잡아보세요.`,
 "STRATEGIST REPORT":"전략 리포트","WEALTH EXPANSION STRATEGY":"재물 확장 방향","Wealth comes from repeated decisions aligned with timing, structure, and energy.":"시기, 구조와 기운을 고려한 판단을 꾸준히 쌓아가는 것이 중요합니다.","BUSINESS APTITUDE":"사업 적성","You are better suited to projects where expertise, timing, trust, systems, and reputation matter.":"전문성, 타이밍, 신뢰, 체계와 평판이 중요한 일을 살펴보세요.","LEADERSHIP PATTERN":"리더십 성향","Your leadership appears through judgment, consistency, protection, planning, or responsibility.":"판단력, 일관성, 보호, 계획 또는 책임감을 통해 리더십이 드러납니다.","OPPORTUNITY WINDOWS":"기회를 살펴보는 시점","Opportunity appears when internal structure and external timing align.":"내부의 준비와 외부의 시기가 맞을 때 기회를 살펴보세요.",
 "LIFECODE BLUEPRINT":"라이프코드 종합 리포트",[`Your LifeCode is a ${strength} structure centered around ${dominant} Energy.`]:`라이프코드는 ${d}의 기운을 중심으로 ${s} 구조를 나타냅니다.`,"LIFE MISSION":"삶의 방향",[`Dominant Energy: ${dominant}`]:`두드러진 기운: ${d}`,"BUSINESS STRATEGY":"사업 방향","Build structure, timing, credibility, and repeatable value.":"체계, 시기 판단, 신뢰와 반복 가능한 가치를 쌓아보세요.","WEALTH PRESERVATION":"재물 지키기","Before expansion, preserve structure.":"확장하기 전에 기반을 지켜보세요.","PARTNERSHIP SELECTION":"함께할 사람","The right partner multiplies destiny.":"잘 맞는 파트너와 함께 성장할 방향을 살펴보세요.","PLANETARY TIMING":"음양의 흐름","Sunlit energy brings visibility and action.":"양의 기운은 드러남과 행동을 상징합니다.","Moonlit energy brings storage and depth.":"음의 기운은 축적과 깊이를 상징합니다.","FUTURE SCENARIO MATRIX":"미래 방향 살펴보기","SCENARIO A - CONSERVATIVE GROWTH":"시나리오 A · 신중한 성장","SCENARIO B - STRATEGIC EXPANSION":"시나리오 B · 전략적인 확장","SCENARIO C - MAXIMUM OPPORTUNITY":"시나리오 C · 기회의 적극적인 활용"
 }
 return <div className="space-y-5">{report.split("\n").map(x=>x.trim()).filter(Boolean).map((line,i)=><p key={i}><Bi en={line} ko={translations[line] || ko(line)} /></p>)}</div>
}
