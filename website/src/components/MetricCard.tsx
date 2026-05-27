import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

type MetricCardProps = {
  title: string;
  description: string;
};

export function MetricCard({ title, description }: MetricCardProps) {
  return (
    <motion.article
      className="h-full"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -4 }}
    >
      <GlassCard accent={title.includes("Negative") ? "rose" : title.includes("Positive") ? "emerald" : title.includes("macro") ? "cyan" : "violet"} className="h-full p-5">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-4 text-sm leading-6 text-slate-300">{description}</p>
      </GlassCard>
    </motion.article>
  );
}
