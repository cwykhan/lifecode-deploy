import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
const VISITOR_KEY = "kupfate:total-visitors"
const BASELINE = Number(process.env.VISITOR_BASELINE || "10000")

async function redis(command: (string | number)[]) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error("Upstash Redis environment variables are missing")
  }

  const res = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command),
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error(`Redis error: ${res.status}`)
  }

  const data = await res.json()
  return data.result
}

export async function GET() {
  try {
    const value = await redis(["GET", VISITOR_KEY])
    const stored =
      value === null || value === undefined || Number.isNaN(Number(value))
        ? 0
        : Number(value)

    return NextResponse.json(
      { count: BASELINE + stored },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" }
      }
    )
  } catch (error) {
    console.error("Visitor GET error:", error)

    return NextResponse.json(
      { count: BASELINE },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" }
      }
    )
  }
}

export async function POST() {
  try {
    const value = await redis(["INCR", VISITOR_KEY])
    const incremented = Number.isNaN(Number(value)) ? 0 : Number(value)

    return NextResponse.json(
      { count: BASELINE + incremented },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" }
      }
    )
  } catch (error) {
    console.error("Visitor POST error:", error)

    return NextResponse.json(
      { count: BASELINE },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" }
      }
    )
  }
}
