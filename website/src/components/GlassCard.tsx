import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  accent?: "cyan" | "violet" | "emerald" | "amber" | "rose";
};

const accentClasses = {
  cyan: "after:from-cyan-300/18",
  violet: "after:from-violet-300/18",
  emerald: "after:from-emerald-300/18",
  amber: "after:from-amber-300/18",
  rose: "after:from-rose-300/18",
};

export function GlassCard({ children, className = "", accent = "cyan" }: GlassCardProps) {
  return (
    <div
      className={`premium-glass-card ${accentClasses[accent]} ${className}`}
    >
      {children}
    </div>
  );
}
