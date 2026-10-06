import Bi from "@/components/BilingualText"
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white p-10 text-[#373341]">
      <h1 className="mb-6 text-4xl font-bold"><Bi en="Privacy Policy" ko="개인정보 처리방침" /></h1>
      <p><Bi en="LifeCode AI collects only the information required to provide digital analysis reports and process payments." ko="LifeCode AI는 분석 리포트 제공과 결제 처리에 필요한 정보를 수집합니다." /></p>
      <p className="mt-4"><Bi en="We do not sell personal information to third parties." ko="개인정보를 제3자에게 판매하지 않습니다." /></p>
      <p className="mt-4"><Bi en="Payment processing is handled securely by Paddle." ko="결제 처리는 Paddle에서 담당합니다." /></p>
      <p className="mt-4"><Bi en="Contact: chldhksdyd@gmail.com" ko="문의: chldhksdyd@gmail.com" /></p>
    </main>
  )
}
