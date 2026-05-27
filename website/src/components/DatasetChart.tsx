import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { classDistribution } from "../data/researchData";
import { GlassCard } from "./GlassCard";

export function DatasetChart() {
  return (
    <GlassCard accent="emerald" className="h-[340px] p-5">
      <h3 className="mb-4 text-xl font-semibold text-white">Класс таралуы</h3>
      <ResponsiveContainer width="100%" height="86%">
        <BarChart data={classDistribution} margin={{ top: 16, right: 10, left: 0, bottom: 10 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "#cbd5e1", fontSize: 13 }} />
          <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.06)" }}
            contentStyle={{
              background: "rgba(8, 16, 32, 0.94)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "14px",
              color: "#fff",
            }}
            formatter={(value) => (typeof value === "number" ? value.toLocaleString("kk-KZ") : String(value))}
          />
          <Bar dataKey="value" radius={[12, 12, 3, 3]}>
            {classDistribution.map((entry) => (
              <Cell key={entry.label} fill={entry.label === "Позитив" ? "#34d399" : "#fb7185"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
