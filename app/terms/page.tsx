import Bi from "@/components/BilingualText"
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white p-10 text-[#373341]">
      <h1 className="mb-6 text-4xl font-bold"><Bi en="Terms of Service" ko="이용약관" /></h1>
      <p><Bi en="LifeCode AI provides digital destiny analysis and self-reflection reports." ko="LifeCode AI는 사주 분석과 자기 성찰을 위한 디지털 리포트를 제공합니다." /></p>
      <p className="mt-4"><Bi en="All reports are for entertainment, reflection, and educational purposes only." ko="모든 리포트는 오락, 자기 성찰, 학습을 위한 자료입니다." /></p>
      <p className="mt-4"><Bi en="Reports should not be treated as medical, legal, financial, or professional advice." ko="리포트는 의료·법률·재무 등 전문적인 조언을 대신하지 않습니다." /></p>
      <p className="mt-4"><Bi en="Contact: chldhksdyd@gmail.com" ko="문의: chldhksdyd@gmail.com" /></p>
    </main>
  )
}
