import Bi from "@/components/BilingualText"
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white p-10 text-[#373341]">
      <h1 className="text-5xl font-black text-[#725b38]"><Bi en="Contact Support" ko="고객 문의" /></h1>

      <div className="mt-8 space-y-4 text-xl">
        <p><Bi en="Email: janus101@live.co.kr" ko="문의 이메일: janus101@live.co.kr" /></p>
        <p><Bi en="Alternative Email: chldhksdyd@gmail.com" ko="보조 이메일: chldhksdyd@gmail.com" /></p>
        <p><Bi en="Business Hours: Monday - Friday" ko="상담 요일: 월요일부터 금요일" /></p>
        <p><Bi en="Business Time: 09 - 18 KST" ko="상담 시간: 한국 시간 오전 9시부터 오후 6시" /></p>
        <p><Bi en="Response Time: 24-48 hours" ko="답변 소요 시간: 24~48시간" /></p>
      </div>
    </main>
  )
}
