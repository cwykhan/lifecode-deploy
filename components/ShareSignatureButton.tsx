"use client"

export default function ShareSignatureButton({ result }: { result: any }) {
  const dominant = result?.strength?.dominantEnergy || "Earth"
  const useful = result?.usefulEnergy || "Metal"
  const day = result?.pillars?.day?.stem?.symbol || ""

  const text = `I discovered my Life Signature on K-UPFATE.

Planet Energy: ${dominant}
Useful Energy: ${useful}
Day Sky Energy: ${day}

What is your Planet Signature?

https://kupfate.com`

  const share = async () => {
    try {
      await navigator.clipboard.writeText(text)
      alert("Your Life Signature message has been copied. Paste it on Facebook, X, Reddit, or chat.")
    } catch {
      alert(text)
    }
  }

  return (
    <button
      onClick={share}
      className="rounded-2xl border border-cyan-300/40 bg-cyan-500/10 px-7 py-4 text-lg font-black text-cyan-100 transition hover:bg-cyan-500/20"
    >
      Share My Life Signature
    </button>
  )
}
