import { motion } from "framer-motion";
import { BarChart3, Binary, Brain, FileText, FolderCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pipelineSteps } from "../data/researchData";
import { GlassCard } from "./GlassCard";

const icons: LucideIcon[] = [FileText, Sparkles, Binary, Brain, BarChart3, FolderCheck];
const accents = ["cyan", "violet", "emerald", "cyan", "amber", "emerald"] as const;
const offsets = ["xl:translate-y-0", "xl:translate-y-8", "xl:-translate-y-4", "xl:translate-y-10", "xl:-translate-y-2", "xl:translate-y-6"];

export function Pipeline() {
  return (
    <div className="relative mt-4">
      <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/50 to-emerald-300/0 xl:left-0 xl:right-0 xl:top-1/2 xl:h-px xl:w-full xl:bg-gradient-to-r" />
      <div className="grid gap-5 xl:grid-cols-6 xl:gap-4">
        {pipelineSteps.map((step, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={step.title}
              className={`relative pl-14 xl:pl-0 ${offsets[index]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="absolute left-0 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-300 text-sm font-bold text-slate-950 shadow-[0_0_34px_rgba(103,232,249,0.55)] xl:left-1/2 xl:top-[-30px] xl:-translate-x-1/2">
                {index + 1}
              </div>
              <GlassCard accent={accents[index]} className="min-h-[210px] p-5">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] text-cyanSoft ring-1 ring-white/10">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
