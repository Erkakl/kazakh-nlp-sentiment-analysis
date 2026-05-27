import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { NavItem, SectionId } from "../data/researchData";

type MobileNavProps = {
  navItems: NavItem[];
  activeSection: SectionId;
};

export function MobileNav({ navItems, activeSection }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const activeLabel = navItems.find((item) => item.id === activeSection)?.label ?? "Басты бет";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/72 backdrop-blur-2xl lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <a href="#hero" className="text-sm font-semibold text-white">
          {activeLabel}
        </a>
        <button
          type="button"
          className="rounded-full bg-white/10 p-2 text-white"
          onClick={() => setOpen((value) => !value)}
          aria-label="Мәзір"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="grid max-h-[75vh] gap-1 overflow-y-auto border-t border-white/10 px-4 py-4">
          {navItems.map((item) => {
            const active = item.id === activeSection;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm transition ${
                  active ? "bg-cyan-300 text-slate-950 font-semibold" : "bg-white/7 text-slate-200"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
