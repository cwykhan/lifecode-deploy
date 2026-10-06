import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

const DATA_DIR = path.join(process.cwd(), "data")
const COUNT_FILE = path.join(DATA_DIR, "visitor-count.txt")
const INITIAL_COUNT = 10000

function readCount(): number {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }

    if (!fs.existsSync(COUNT_FILE)) {
      fs.writeFileSync(COUNT_FILE, String(INITIAL_COUNT), "utf8")
      return INITIAL_COUNT
    }

    const value = Number(fs.readFileSync(COUNT_FILE, "utf8").trim())

    return Number.isFinite(value) ? value : INITIAL_COUNT
  } catch {
    return INITIAL_COUNT
  }
}

export async function GET() {
  try {
    const current = readCount()
    const next = current + 1

    fs.writeFileSync(COUNT_FILE, String(next), "utf8")

    return NextResponse.json(
      { count: next },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    )
  } catch {
    return NextResponse.json({ count: INITIAL_COUNT })
  }
}
