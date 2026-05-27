import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { SectionId } from "../data/researchData";

type SectionProps = {
  id: SectionId;
  eyebrow?: string;
  title?: string;
  activeSection: SectionId;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, activeSection, children }: SectionProps) {
  const active = id === activeSection;

  return (
    <section id={id} className="min-h-[90vh] scroll-mt-20 py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-10">
        {(eyebrow || title) && (
          <motion.div
            className="mb-10 max-w-4xl"
            animate={{ scale: active ? 1.01 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {eyebrow && (
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyanSoft">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`text-balance text-3xl font-semibold text-white transition-all duration-500 sm:text-4xl md:text-5xl ${
                  active ? "drop-shadow-[0_0_22px_rgba(103,232,249,0.24)]" : ""
                }`}
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
