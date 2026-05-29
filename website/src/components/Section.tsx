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
    <section id={id} className="presentation-slide min-h-screen scroll-mt-20 px-0 py-20 md:py-24">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-[1180px] flex-col justify-center px-4 sm:px-6 lg:px-10">
        {(eyebrow || title) && (
          <motion.div
            className="mb-8 max-w-4xl"
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
