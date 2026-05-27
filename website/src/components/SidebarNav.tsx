import { motion } from "framer-motion";
import type { NavItem, SectionId } from "../data/researchData";

type SidebarNavProps = {
  navItems: NavItem[];
  activeSection: SectionId;
};

export function SidebarNav({ navItems, activeSection }: SidebarNavProps) {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[260px] border-r border-white/10 bg-slate-950/45 px-5 py-6 backdrop-blur-2xl lg:block">
      <a
        href="#hero"
        className="block rounded-3xl border border-white/10 bg-white/[0.07] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition hover:border-cyan-300/25 hover:bg-white/[0.10]"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-cyanSoft">NLP зерттеу</p>
        <p className="mt-2 text-base font-semibold leading-6 text-white">Қазақ мәтіндерін талдау</p>
      </a>

      <nav className="mt-7 space-y-1.5">
        {navItems.map((item) => {
          const active = item.id === activeSection;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group relative flex origin-left items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300 ${
                active
                  ? "scale-110 bg-white/10 text-white opacity-100 shadow-[0_0_34px_rgba(34,211,238,0.10)]"
                  : "scale-100 text-slate-400 opacity-70 hover:bg-white/[0.06] hover:text-slate-100 hover:opacity-100"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  active ? "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.95)]" : "bg-slate-600"
                }`}
              />
              {active && (
                <motion.span
                  layoutId="active-sidebar-bar"
                  className="absolute left-0 top-2 h-8 w-1 rounded-r-full bg-cyan-300"
                />
              )}
              <span className={`text-sm transition-all duration-300 ${active ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
