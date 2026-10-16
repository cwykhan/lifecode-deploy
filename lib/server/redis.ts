
import "server-only"

export async function redisCommand(
  command: (string | number)[]
) {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    throw new Error("Redis configuration missing")
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command),
    cache: "no-store"
  })

  if (!response.ok) {
    throw new Error(`Redis HTTP ${response.status}`)
  }

  const data = await response.json()

  if (data.error) {
    throw new Error("Redis command failed")
  }

  return data.result
}

