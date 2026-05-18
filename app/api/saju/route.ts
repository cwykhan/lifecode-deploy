export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const { year, month, day, hour, minute } = await req.json()

    const requireFunc = eval("require")
    const { execSync } = requireFunc("child_process")

    const scriptPath =
      process.cwd() + "/engine/node/runSajuEngine.js"

    const cmd =
      "node " +
      JSON.stringify(scriptPath) +
      " " +
      String(year) +
      " " +
      String(month) +
      " " +
      String(day) +
      " " +
      String(hour) +
      " " +
      String(minute)

    const result = execSync(cmd, {
      encoding: "utf-8",
      cwd: process.cwd() + "/engine/node"
    })

    return Response.json(JSON.parse(result))
  } catch (error) {
    return Response.json(
      {
        error: "saju engine failed",
        detail: String(error)
      },
      { status: 500 }
    )
  }
}
