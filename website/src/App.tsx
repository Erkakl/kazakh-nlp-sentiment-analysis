import { useMemo, useState } from "react";
import { AlertTriangle, BookOpen, CheckCircle2, ChevronDown, ExternalLink, FileText, Goal, Quote, Sparkles } from "lucide-react";
import {
  datasetStats,
  definitionGroups,
  futureWork,
  keyFindings,
  metricLabels,
  metricsExplanation,
  modelInfos,
  navItems,
  pipelineExplanations,
  relevancePoints,
  researchGoal,
  researchTasks,
  useCases,
} from "./data/researchData";
import type { MetricKey, SectionId } from "./data/researchData";
import { useActiveSection } from "./hooks/useActiveSection";
import { SidebarNav } from "./components/SidebarNav";
import { MobileNav } from "./components/MobileNav";
import { Section } from "./components/Section";
import { Hero } from "./components/Hero";
import { StatCard } from "./components/StatCard";
import { DatasetChart } from "./components/DatasetChart";
import { Pipeline } from "./components/Pipeline";
import { ExpandableCard } from "./components/ExpandableCard";
import { ModelCard } from "./components/ModelCard";
import { MetricCard } from "./components/MetricCard";
import { ComparisonChart } from "./components/ComparisonChart";
import { ComparisonTable } from "./components/ComparisonTable";
import { ConfusionMatrix } from "./components/ConfusionMatrix";
import { FindingCard } from "./components/FindingCard";
import { GlassCard } from "./components/GlassCard";

const metricKeys: MetricKey[] = ["macro_f1", "accuracy", "negative_recall", "positive_recall"];

function App() {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="min-h-screen overflow-hidden text-slate-100">
      <SidebarNav navItems={navItems} activeSection={activeSection} />
      <MobileNav navItems={navItems} activeSection={activeSection} />
      <main className="lg:ml-[260px]">
        <Hero />
        <DefinitionsSection activeSection={activeSection} />
        <RelevanceSection activeSection={activeSection} />
        <GoalSection activeSection={activeSection} />
        <DatasetSection activeSection={activeSection} />
        <PipelineSection activeSection={activeSection} />
        <ModelsSection activeSection={activeSection} />
        <MetricsSection activeSection={activeSection} />
        <ResultsSection activeSection={activeSection} />
        <ConfusionSection activeSection={activeSection} />
        <FindingsSection activeSection={activeSection} />
        <UseCasesSection activeSection={activeSection} />
        <FutureWorkSection activeSection={activeSection} />
        <ConclusionSection activeSection={activeSection} />
      </main>
    </div>
  );
}

function DefinitionsSection({ activeSection }: { activeSection: SectionId }) {
  const [open, setOpen] = useState(false);

  return (
    <Section id="definitions" eyebrow="Анықтама" title="Жобада қолданылған негізгі ұғымдар" activeSection={activeSection}>
      <GlassCard accent="cyan" className="p-5 sm:p-7">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <span className="flex min-w-0 items-center gap-3">
            <BookOpen className="shrink-0 text-cyanSoft" size={28} />
            <span>
              <span className="block text-xl font-semibold text-white">Анықтама бөлімін ашу</span>
              <span className="mt-1 block text-sm leading-6 text-slate-300">
                TF-IDF, модельдер, метрикалар және экспериментті түсінуге қажет терминдер.
              </span>
            </span>
          </span>
          <ChevronDown className={`shrink-0 text-cyanSoft transition ${open ? "rotate-180" : ""}`} />
        </button>

        <div className={`grid transition-all duration-300 ${open ? "mt-7 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div className="grid gap-5 lg:grid-cols-2">
              {definitionGroups.map((group) => (
                <div key={group.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="text-lg font-semibold text-cyanSoft">{group.title}</h3>
                  <dl className="mt-4 space-y-4">
                    {group.items.map((item) => (
                      <div key={item.term}>
                        <dt className="font-semibold text-white">{item.term}</dt>
                        <dd className="mt-1 text-sm leading-6 text-slate-300">{item.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </Section>
  );
}

function RelevanceSection({ activeSection }: { activeSection: SectionId }) {
  return (
    <Section id="relevance" eyebrow="Өзектілік" title="Қазақ тіліндегі NLP не үшін маңызды?" activeSection={activeSection}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {relevancePoints.map((text) => (
          <GlassCard key={text} accent="cyan" className="p-6 transition-transform duration-300 hover:-translate-y-1">
            <Sparkles className="mb-4 text-cyanSoft" />
            <p className="leading-7 text-slate-200">{text}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}

function GoalSection({ activeSection }: { activeSection: SectionId }) {
  return (
    <Section id="goal" eyebrow="Мақсат" title="Зерттеу мақсаты мен міндеттері" activeSection={activeSection}>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard accent="violet" className="p-7">
          <Goal className="mb-5 text-cyanSoft" size={34} />
          <h3 className="text-2xl font-semibold text-white">Мақсат</h3>
          <p className="mt-4 text-lg leading-8 text-slate-200">{researchGoal}</p>
        </GlassCard>
        <div className="grid gap-3 sm:grid-cols-2">
          {researchTasks.map((task) => (
            <GlassCard key={task} accent="emerald" className="flex gap-3 p-4">
              <CheckCircle2 className="mt-1 shrink-0 text-mintSoft" size={20} />
              <p className="leading-6 text-slate-200">{task}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

function DatasetSection({ activeSection }: { activeSection: SectionId }) {
  return (
    <Section id="dataset" eyebrow="Деректер" title="Деректер жиыны және класстар теңгерімсіздігі" activeSection={activeSection}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {datasetStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <p className="mt-5 text-base leading-7 text-slate-300">
        Деректер жиынында қазақ тілінде жазылған әртүрлі адамдардың 134368 пікірі қолданылды.
      </p>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <DatasetChart />
        <GlassCard accent="amber" className="flex items-center p-6">
          <p className="text-xl leading-9 text-slate-100">
            Позитив класы негатив класынан <span className="font-semibold text-amberSoft">4.61 есе</span> көп.
            Сондықтан дәлдік жалғыз өзі модель сапасын толық көрсете алмайды.
          </p>
        </GlassCard>
      </div>
    </Section>
  );
}

function PipelineSection({ activeSection }: { activeSection: SectionId }) {
  return (
    <Section id="pipeline" eyebrow="Pipeline" title="Эксперимент кезеңдері" activeSection={activeSection}>
      <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-300">
        Мәтіннен бастап модель нәтижесіне дейінгі толық өңдеу жолы.
      </p>
      <Pipeline />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {pipelineExplanations.map((item, index) => (
          <ExpandableCard key={item.title} {...item} defaultOpen={index === 0} />
        ))}
      </div>
    </Section>
  );
}

function ModelsSection({ activeSection }: { activeSection: SectionId }) {
  return (
    <Section id="models" eyebrow="Модельдер" title="Салыстырылған базалық модельдер" activeSection={activeSection}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {modelInfos.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </Section>
  );
}

function MetricsSection({ activeSection }: { activeSection: SectionId }) {
  return (
    <Section id="metrics" eyebrow="Метрикалар" title="Нәтижені қалай түсінеміз?" activeSection={activeSection}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {metricsExplanation.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
      <GlassCard accent="amber" className="mt-6 flex gap-4 p-6">
        <AlertTriangle className="mt-1 shrink-0 text-amberSoft" />
        <p className="text-lg leading-8 text-slate-100">
          Класстар теңгерімсіз болғанда дәлдік жоғары болып көрінуі мүмкін, бірақ бұл модель барлық классты жақсы
          анықтайды деген сөз емес.
        </p>
      </GlassCard>
      <GlassCard accent="cyan" className="mt-4 p-5">
        <p className="text-sm leading-7 text-slate-300">
          Дәлдік (accuracy) — жалпы дұрыс жауаптар үлесі. negative recall — нақты негатив пікірлердің қаншасы дұрыс
          табылғанын көрсетеді. positive recall — нақты позитив пікірлердің қаншасы дұрыс табылғанын көрсетеді.
        </p>
      </GlassCard>
    </Section>
  );
}

function ResultsSection({ activeSection }: { activeSection: SectionId }) {
  const [activeMetric, setActiveMetric] = useState<MetricKey>("macro_f1");

  return (
    <Section id="results" eyebrow="Нәтижелер" title="Модельдерді салыстыру" activeSection={activeSection}>
      <div className="mb-5 flex flex-wrap gap-2">
        {metricKeys.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveMetric(key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeMetric === key ? "scale-105 bg-cyan-300 text-slate-950" : "bg-white/8 text-slate-200 hover:bg-white/14"
            }`}
          >
            {metricLabels[key]}
          </button>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <ComparisonChart activeMetric={activeMetric} />
        <ComparisonTable />
      </div>
    </Section>
  );
}

function ConfusionSection({ activeSection }: { activeSection: SectionId }) {
  return (
    <Section id="confusion" eyebrow="Қателесу матрицасы" title="Multinomial Naive Bayes моделінің қателері" activeSection={activeSection}>
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <ConfusionMatrix />
        <GlassCard accent="rose" className="flex items-center p-7">
          <p className="text-xl leading-9 text-slate-100">
            Модель позитив пікірлерді жақсы анықтайды, бірақ негатив пікірлердің едәуір бөлігін позитив деп қате
            белгілейді. Бұл класстар теңгерімсіздігі мәселесінің әсерін көрсетеді.
          </p>
        </GlassCard>
      </div>
    </Section>
  );
}

function FindingsSection({ activeSection }: { activeSection: SectionId }) {
  return (
    <Section id="findings" eyebrow="Негізгі қорытындылар" title="Ең маңызды табылған нәтижелер" activeSection={activeSection}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {keyFindings.map((finding) => (
          <FindingCard key={`${finding.title}-${finding.value}`} finding={finding} />
        ))}
      </div>
      <GlassCard accent="emerald" className="mt-6 p-6">
        <p className="text-lg leading-8 text-slate-100">
          Теңгерілген Logistic Regression negative recall көрсеткішін арттырды, бірақ macro-F1 төмендеді. Бұл негатив
          пікірлерді жақсырақ табу мен жалпы macro-F1 көрсеткішін сақтау арасында ымыра бар екенін көрсетті.
        </p>
      </GlassCard>
    </Section>
  );
}

function UseCasesSection({ activeSection }: { activeSection: SectionId }) {
  return (
    <Section id="use-cases" eyebrow="Қолдану бағыттары" title="Практикалық маңызы" activeSection={activeSection}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {useCases.map((useCase) => {
          const Icon = useCase.icon;
          return (
            <GlassCard key={useCase.title} accent="emerald" className="p-5 transition-transform duration-300 hover:-translate-y-1">
              <Icon className="mb-4 text-mintSoft" />
              <p className="leading-6 text-slate-100">{useCase.title}</p>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}

function FutureWorkSection({ activeSection }: { activeSection: SectionId }) {
  return (
    <Section id="future-work" eyebrow="Болашақ жұмыс" title="Келесі зерттеу бағыттары" activeSection={activeSection}>
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassCard accent="amber" className="p-6">
          <Quote className="mb-4 text-amberSoft" />
          <p className="text-xl leading-9 text-slate-100">
            Бұл жұмыста BERT/KazBERT/mBERT модельдері тәжірибе жүзінде тексерілген жоқ. Олар болашақ зерттеу бағыты
            ретінде қарастырылады.
          </p>
        </GlassCard>
        <div className="grid gap-3">
          {futureWork.map((item) => (
            <GlassCard key={item} accent="cyan" className="flex gap-3 p-4">
              <FileText className="mt-1 shrink-0 text-cyanSoft" size={19} />
              <p className="text-slate-200">{item}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ConclusionSection({ activeSection }: { activeSection: SectionId }) {
  return (
    <Section id="conclusion" eyebrow="Қорытынды" title="Жобаның негізгі қорытындысы" activeSection={activeSection}>
      <GlassCard accent="cyan" className="p-7 md:p-10">
        <p className="text-xl leading-9 text-slate-100 md:text-2xl md:leading-10">
          Жұмыс нәтижесінде қазақ тіліндегі мәтіндердің пікір реңкін классификациялау үшін TF-IDF негізіндегі
          классикалық базалық модельдер сәтті тексерілді. Ең жоғары macro-F1 көрсеткішін Multinomial Naive Bayes
          көрсетті. Алайда negative recall төмен болғандықтан, класстар теңгерімсіздігі маңызды фактор екені
          анықталды.
        </p>
        <a
          href="/research-paper.docx"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Толық жұмысты ашу
          <ExternalLink size={18} />
        </a>
      </GlassCard>
    </Section>
  );
}

export default App;
