import { motion } from "framer-motion";
import type { Finding } from "../data/researchData";
import { GlassCard } from "./GlassCard";

type FindingCardProps = {
  finding: Finding;
};

export function FindingCard({ finding }: FindingCardProps) {
  const Icon = finding.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <GlassCard accent={finding.title.includes("negative") ? "rose" : finding.title.includes("Дәлдік") ? "violet" : "cyan"} className="p-5">
        <Icon className="mb-4 text-cyanSoft" />
        <p className="text-sm text-slate-300">{finding.title}</p>
        <p className="mt-2 break-words text-lg font-semibold text-white">{finding.value}</p>
      </GlassCard>
    </motion.article>
  );
}
