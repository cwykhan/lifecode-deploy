"use client"

const links: Record<string, string> = {
  bronze: "https://www.paypal.com/ncp/payment/T729EHJGQA42L",
  silver: "https://www.paypal.com/ncp/payment/YHV8CVQCRAZDQ",
  gold: "https://www.paypal.com/ncp/payment/FVM66TC549CZC",
  platinum: "https://www.paypal.com/ncp/payment/M4H7852YGTY7J"
}

export default function PayPalButton({ plan }: { plan: string }) {
  const url = links[plan] || links.bronze

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 inline-block rounded-2xl border border-yellow-300 bg-yellow-500/10 px-8 py-4 text-lg font-black text-yellow-100 transition hover:bg-yellow-500/20"
    >
      PAY WITH PAYPAL · {plan.toUpperCase()}
    </a>
  )
}
