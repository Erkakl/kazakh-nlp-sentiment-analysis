import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import { heroData } from "../data/researchData";
import { GlassCard } from "./GlassCard";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden pt-20">
      <div className="absolute inset-0 hero-visual-grid opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07111f] to-transparent" />
      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-5 inline-flex rounded-full border border-cyan-200/25 bg-cyan-200/10 px-4 py-2 text-sm font-medium text-cyanSoft">
            {heroData.section}
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-emerald-100 bg-clip-text text-transparent">
              {heroData.title}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{heroData.subtitle}</p>
          <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            <GlassCard accent="cyan" className="p-4">
              <p className="text-slate-400">Авторлар</p>
              <p className="mt-1 font-semibold text-white">{heroData.authors}</p>
            </GlassCard>
            <GlassCard accent="violet" className="p-4">
              <p className="text-slate-400">Сынып</p>
              <p className="mt-1 font-semibold text-white">{heroData.className}</p>
            </GlassCard>
            <GlassCard accent="emerald" className="p-4">
              <p className="text-slate-400">Мектеп</p>
              <p className="mt-1 font-semibold text-white">{heroData.school}</p>
            </GlassCard>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#results"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Зерттеу нәтижелері
              <ArrowDown size={18} />
            </a>
            <a
              href="#models"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-6 py-3 font-semibold text-white transition hover:bg-white/14"
            >
              Модельдерді салыстыру
            </a>
            <a
              href="/research-paper.docx"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/30 bg-white/12 px-6 py-3 font-semibold text-white transition hover:bg-white/18"
            >
              Жұмысты ашу
              <ExternalLink size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <GlassCard accent="violet" className="min-h-[440px] p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/16 via-transparent to-violet-300/12" />
            <div className="relative grid h-full gap-4">
              {heroData.tags.map((word, index) => (
                <motion.div
                  key={word}
                  className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 backdrop-blur-xl"
                  animate={{ x: index % 2 === 0 ? [0, 10, 0] : [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 5 + index, ease: "easeInOut" }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-semibold text-white">{word}</span>
                    <span className="h-2 w-24 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
