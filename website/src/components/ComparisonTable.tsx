import { modelMetrics } from "../data/researchData";
import { GlassCard } from "./GlassCard";

export function ComparisonTable() {
  return (
    <GlassCard accent="cyan" className="overflow-hidden p-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-slate-300">
            <tr className="border-b border-white/10">
              <th className="py-3 pr-3 font-medium">Модель</th>
              <th className="px-3 py-3 font-medium">Дәлдік</th>
              <th className="px-3 py-3 font-medium">macro-F1</th>
              <th className="px-3 py-3 font-medium">weighted-F1</th>
              <th className="px-3 py-3 font-medium">negative recall</th>
              <th className="px-3 py-3 font-medium">positive recall</th>
            </tr>
          </thead>
          <tbody>
            {modelMetrics.map((model) => {
              const bestMacro = model.model_name === "tfidf_multinomial_nb";
              const bestNegative = model.model_name === "tfidf_logistic_regression_balanced";
              return (
                <tr key={model.model_name} className="border-b border-white/8 text-slate-200">
                  <td className="max-w-[230px] break-words py-4 pr-3">
                    <span className="font-medium text-white">{model.displayName}</span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {bestMacro && (
                        <span className="rounded-full bg-cyan-300/15 px-2 py-1 text-xs text-cyanSoft">
                          macro-F1 үздік
                        </span>
                      )}
                      {bestNegative && (
                        <span className="rounded-full bg-rose-300/15 px-2 py-1 text-xs text-roseSoft">
                          negative recall үздік
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-4">{model.accuracy.toFixed(6)}</td>
                  <td className="px-3 py-4">{model.macro_f1.toFixed(6)}</td>
                  <td className="px-3 py-4">{model.weighted_f1.toFixed(6)}</td>
                  <td className="px-3 py-4">{model.negative_recall.toFixed(6)}</td>
                  <td className="px-3 py-4">{model.positive_recall.toFixed(6)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
