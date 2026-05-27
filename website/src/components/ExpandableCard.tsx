import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "./GlassCard";

type ExpandableCardProps = {
  title: string;
  description: string;
  defaultOpen?: boolean;
};

export function ExpandableCard({ title, description, defaultOpen = false }: ExpandableCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <GlassCard accent="cyan" className="p-6">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 text-left"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-white">{title}</span>
        <ChevronDown className={`shrink-0 text-cyanSoft transition ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p className="mt-4 leading-7 text-slate-300">{description}</p>
      </motion.div>
    </GlassCard>
  );
}
