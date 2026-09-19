import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"
export const revalidate = 0

const INITIAL_COUNT = 10000
const DATA_DIR = path.join(process.cwd(), "data")
const COUNT_FILE = path.join(DATA_DIR, "visitor-count.txt")

function ensureCounter() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  if (!fs.existsSync(COUNT_FILE)) {
    fs.writeFileSync(COUNT_FILE, String(INITIAL_COUNT), "utf8")
  }
}

function readCount(): number {
  ensureCounter()

  const raw = fs.readFileSync(COUNT_FILE, "utf8").trim()
  const count = Number(raw)

  if (!Number.isFinite(count) || count < INITIAL_COUNT) {
    return INITIAL_COUNT
  }

  return Math.floor(count)
}

function response(count: number) {
  return NextResponse.json(
    { count },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    }
  )
}

/*
 * GET = 현재 숫자 조회만
 */
export async function GET() {
  try {
    return response(readCount())
  } catch (error) {
    console.error("Visitor GET error:", error)
    return response(INITIAL_COUNT)
  }
}

/*
 * POST = 현재 숫자 +1 후 저장
 *
 * page.tsx가 페이지 로드/F5 때마다 POST를 호출하므로
 * 새로고침할 때마다 숫자가 증가한다.
 */
export async function POST() {
  try {
    const current = readCount()
    const next = current + 1

    fs.writeFileSync(COUNT_FILE, String(next), "utf8")

    return response(next)
  } catch (error) {
    console.error("Visitor POST error:", error)
    return response(INITIAL_COUNT)
  }
}
