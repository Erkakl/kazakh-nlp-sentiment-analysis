import { confusionMatrix } from "../data/researchData";
import { GlassCard } from "./GlassCard";

export function ConfusionMatrix() {
  return (
    <GlassCard accent="rose" className="p-5">
      <div className="mb-4 grid grid-cols-[1fr_1.2fr_1.2fr] gap-2 text-center text-sm text-slate-300">
        <div />
        <div className="rounded-xl bg-white/8 px-3 py-2">Болжанған негатив</div>
        <div className="rounded-xl bg-white/8 px-3 py-2">Болжанған позитив</div>
      </div>
      <div className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-2">
        <div className="flex items-center justify-center rounded-xl bg-white/8 px-3 py-4 text-center text-sm text-slate-300">
          Нақты негатив
        </div>
        {confusionMatrix[0].map((cell) => (
          <MatrixCell key={cell.label} value={cell.value} label={cell.label} tone={cell.tone} />
        ))}
        <div className="flex items-center justify-center rounded-xl bg-white/8 px-3 py-4 text-center text-sm text-slate-300">
          Нақты позитив
        </div>
        {confusionMatrix[1].map((cell) => (
          <MatrixCell key={cell.label} value={cell.value} label={cell.label} tone={cell.tone} />
        ))}
      </div>
    </GlassCard>
  );
}

function MatrixCell({ value, label, tone }: { value: number; label: string; tone: "correct" | "error" }) {
  return (
    <div
      className={`rounded-2xl p-5 text-center ring-1 ${
        tone === "correct"
          ? "bg-emerald-400/16 ring-emerald-300/25"
          : "bg-rose-400/16 ring-rose-300/25"
      }`}
    >
      <p className="text-3xl font-semibold text-white">{value.toLocaleString("kk-KZ")}</p>
      <p className="mt-2 text-xs leading-5 text-slate-300">{label}</p>
    </div>
  );
}
