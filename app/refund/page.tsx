import Bi from "@/components/BilingualText"
export default function RefundPage() {
  return (
    <main className="min-h-screen bg-white p-10 text-[#373341]">
      <h1 className="mb-6 text-4xl font-bold"><Bi en="Refund Policy" ko="환불 안내" /></h1>
      <p><Bi en="LifeCode AI sells digital reports delivered immediately after purchase." ko="LifeCode AI는 구매 후 제공되는 디지털 리포트를 판매합니다." /></p>
      <p className="mt-4"><Bi en="Because the service is digital, refunds are generally not provided after report delivery." ko="디지털 서비스의 특성상 리포트 제공 후에는 일반적으로 환불되지 않습니다." /></p>
      <p className="mt-4"><Bi en="If a technical issue prevents report generation, contact support for assistance." ko="기술적인 문제로 리포트를 받지 못한 경우 고객지원으로 문의해 주세요." /></p>
      <p className="mt-4"><Bi en="Contact: chldhksdyd@gmail.com" ko="문의: chldhksdyd@gmail.com" /></p>
    </main>
  )
}
