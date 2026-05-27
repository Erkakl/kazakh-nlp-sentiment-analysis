import { motion } from "framer-motion";
import type { ModelInfo } from "../data/researchData";
import { GlassCard } from "./GlassCard";

type ModelCardProps = {
  model: ModelInfo;
};

export function ModelCard({ model }: ModelCardProps) {
  const Icon = model.icon;

  return (
    <motion.article
      className="h-full"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35 }}
    >
      <GlassCard accent={model.id.includes("balanced") ? "emerald" : model.id.includes("logistic") ? "violet" : "cyan"} className="flex h-full flex-col p-6">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyanSoft ring-1 ring-cyan-200/20">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold text-white">{model.displayName}</h3>
        <p className="mt-2 break-words rounded-xl bg-white/[0.06] px-3 py-2 text-xs text-slate-300 ring-1 ring-white/10">
          {model.shortName}
        </p>
        <p className="mt-4 text-sm leading-6 text-slate-300">{model.description}</p>
      </GlassCard>
    </motion.article>
  );
}
