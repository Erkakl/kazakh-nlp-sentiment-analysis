import { useEffect, useState } from "react";
import type { SectionId } from "../data/researchData";

export function useActiveSection(sectionIds: SectionId[]) {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0]);

  useEffect(() => {
    const observers = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => observers.set(entry.target.id, entry));
        const visible = Array.from(observers.values())
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -45% 0px",
        threshold: [0.12, 0.25, 0.45, 0.65],
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
