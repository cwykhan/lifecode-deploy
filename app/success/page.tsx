export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="text-5xl font-black text-yellow-300">
        Payment Complete
      </h1>

      <p className="mt-6 text-xl text-gray-300">
        Your premium LifeCode report has been unlocked.
      </p>

      <a
        href="/"
        className="mt-10 inline-block rounded-xl bg-yellow-500 px-8 py-4 font-black text-black"
      >
        Return to K-upfate
      </a>
    </main>
  )
}
