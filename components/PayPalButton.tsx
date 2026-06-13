"use client"

const links: Record<string, string> = {
  bronze: "https://www.paypal.com/ncp/payment/T729EHJGQA42L"
}

export default function PayPalButton({ plan }: { plan: string }) {
  const handleClick = () => {
    if (plan !== "bronze") {
      alert("This premium tier is currently being prepared. Payment is not available yet.")
      return
    }

    window.open(links.bronze, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handleClick}
      className="mt-8 inline-block rounded-2xl border border-yellow-300 bg-yellow-500/10 px-8 py-4 text-lg font-black text-yellow-100 transition hover:bg-yellow-500/20"
    >
      {plan === "bronze"
        ? "PAY WITH PAYPAL · BRONZE"
        : "COMING SOON · PAYMENT NOT AVAILABLE"}
    </button>
  )
}
