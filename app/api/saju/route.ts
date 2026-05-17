import { execFileSync } from "child_process"
import path from "path"

export async function POST(req: Request) {
  try {
    const { year, month, day, hour, minute } = await req.json()

    const scriptPath = path.join(
      process.cwd(),
      "engine",
      "node",
      "runSajuEngine.js"
    )

    const result = execFileSync(
      "node",
      [scriptPath, String(year), String(month), String(day), String(hour), String(minute)],
      {
        cwd: path.dirname(scriptPath),
        encoding: "utf-8"
      }
    )

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
