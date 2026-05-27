import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { modelMetrics } from "../data/researchData";
import type { MetricKey } from "../data/researchData";
import { GlassCard } from "./GlassCard";

type ComparisonChartProps = {
  activeMetric: MetricKey;
};

export function ComparisonChart({ activeMetric }: ComparisonChartProps) {
  const bestValue = Math.max(...modelMetrics.map((model) => model[activeMetric]));

  return (
    <GlassCard accent="violet" className="h-[390px] p-5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={modelMetrics} margin={{ top: 24, right: 10, left: 0, bottom: 74 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis
            dataKey="shortName"
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
            angle={-18}
            textAnchor="end"
            interval={0}
            height={80}
          />
          <YAxis domain={[0, 1]} tick={{ fill: "#cbd5e1", fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.06)" }}
            contentStyle={{
              background: "rgba(8, 16, 32, 0.94)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "14px",
              color: "#fff",
            }}
            formatter={(value) => (typeof value === "number" ? value.toFixed(6) : String(value ?? ""))}
          />
          <Bar dataKey={activeMetric} radius={[12, 12, 3, 3]}>
            {modelMetrics.map((entry) => (
              <Cell
                key={entry.model_name}
                fill={entry[activeMetric] === bestValue ? "#67e8f9" : "#8b5cf6"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
