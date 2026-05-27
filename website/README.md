# Қазақ NLP зерттеу презентациясы

Бұл жоба қазақ тіліндегі мәтіндерді sentiment classification арқылы талдау бойынша frontend-only интерактивті презентация сайты.

## Технологиялар

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

## Жергілікті іске қосу

```bash
npm install
npm run dev
```

Сайт әдетте `http://localhost:5173` мекенжайында ашылады.

## Production build

```bash
npm run build
```

Build нәтижесі `dist/` қалтасына сақталады.

## Vercel deployment

1. Репозиторийді Vercel-ге импорттау.
2. Framework preset: `Vite`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy басу.

## Жоба құрылымы

```text
src/
  App.tsx
  main.tsx
  data/researchData.ts
  hooks/useActiveSection.ts
  components/
    SidebarNav.tsx
    MobileNav.tsx
    Hero.tsx
    StatCard.tsx
    MetricCard.tsx
    ModelCard.tsx
    DatasetChart.tsx
    ComparisonChart.tsx
    ComparisonTable.tsx
    ConfusionMatrix.tsx
    Pipeline.tsx
    ExpandableCard.tsx
    FindingCard.tsx
    Section.tsx
```

Барлық зерттеу сандары `src/data/researchData.ts` файлында сақталған.

## Ескерту

BERT, KazBERT және mBERT модельдері бұл жұмыста тәжірибе жүзінде тексерілген жоқ. Олар тек болашақ зерттеу бағыты ретінде көрсетілген.
