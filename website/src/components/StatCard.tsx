import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GlassCard } from "./GlassCard";

type StatCardProps = {
  label: string;
  value: number;
  suffix?: string;
  color: string;
};

export function StatCard({ label, value, suffix = "", color }: StatCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 18 });
  const [display, setDisplay] = useState(0);
  const decimals = value % 1 === 0 ? 0 : 2;

  useEffect(() => spring.on("change", setDisplay), [spring]);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -5 }}
    >
      <GlassCard accent={label === "Позитив" ? "emerald" : label === "Негатив" ? "rose" : label.includes("қатынасы") ? "amber" : "cyan"} className="p-5">
        <p className="text-sm text-slate-300">{label}</p>
        <p className={`mt-3 text-3xl font-semibold sm:text-4xl ${color}`}>
          {display.toLocaleString("kk-KZ", {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
          })}
          {suffix}
        </p>
      </GlassCard>
    </motion.div>
  );
}
