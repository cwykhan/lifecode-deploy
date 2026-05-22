"use client"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from "recharts"

export default function FiveEnergyRadar({
  data
}: {
  data: {
    energy: string
    value: number
  }[]
}) {
  return (
    <div className="h-[420px] w-full rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-black text-yellow-100">
        Five Energy Balance
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#555" />

          <PolarAngleAxis
            dataKey="energy"
            tick={{
              fill: "#ddd",
              fontSize: 14
            }}
          />

          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{
              fill: "#777"
            }}
          />

          <Radar
            name="Energy"
            dataKey="value"
            stroke="#d4af37"
            fill="#d4af37"
            fillOpacity={0.45}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
