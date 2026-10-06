"use client"
import Bi from "@/components/BilingualText"

const links: Record<string, string> = {
  bronze: "https://www.paypal.com/ncp/payment/T729EHJGQA42L"
}

export default function PayPalButton({ plan }: { plan: string }) {
  const handleClick = () => {
    if (plan !== "bronze") {
      alert("This tier is being prepared. Payment is not available yet.\n이 상품은 준비 중으로, 아직 결제할 수 없습니다.")
      return
    }

    window.open(links.bronze, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handleClick}
      className="mt-8 inline-block rounded-2xl border border-yellow-300 bg-yellow-500/10 px-8 py-4 text-lg font-black text-[#725b38] transition hover:bg-yellow-500/20"
    >
      <Bi en={plan === "bronze" ? "Pay with PayPal · $5" : "Coming soon"} ko={plan === "bronze" ? "PayPal로 브론즈 결제하기" : "준비 중 · 결제 불가"} />
    </button>
  )
}
