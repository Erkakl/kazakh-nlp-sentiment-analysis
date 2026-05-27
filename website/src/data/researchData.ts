import {
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  GraduationCap,
  LineChart,
  MessageSquareText,
  Scale,
  SearchCheck,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SectionId =
  | "hero"
  | "relevance"
  | "goal"
  | "dataset"
  | "pipeline"
  | "models"
  | "metrics"
  | "results"
  | "confusion"
  | "findings"
  | "use-cases"
  | "future-work"
  | "conclusion";

export type NavItem = {
  id: SectionId;
  label: string;
};

export type ModelMetric = {
  model_name: string;
  label: string;
  displayName: string;
  shortName: string;
  accuracy: number;
  macro_f1: number;
  weighted_f1: number;
  negative_recall: number;
  positive_recall: number;
};

export type MetricKey = "macro_f1" | "accuracy" | "negative_recall" | "positive_recall";

export type StatItem = {
  label: string;
  value: number;
  suffix?: string;
  color: string;
};

export type ModelInfo = {
  title: string;
  id: string;
  displayName: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
};

export type Finding = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export type UseCase = {
  title: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { id: "hero", label: "Басты бет" },
  { id: "relevance", label: "Өзектілік" },
  { id: "goal", label: "Мақсат" },
  { id: "dataset", label: "Деректер" },
  { id: "pipeline", label: "Pipeline" },
  { id: "models", label: "Модельдер" },
  { id: "metrics", label: "Метрикалар" },
  { id: "results", label: "Нәтижелер" },
  { id: "confusion", label: "Қателесу матрицасы" },
  { id: "findings", label: "Негізгі қорытындылар" },
  { id: "use-cases", label: "Қолдану бағыттары" },
  { id: "future-work", label: "Болашақ жұмыс" },
  { id: "conclusion", label: "Қорытынды" },
];

export const heroData = {
  section: "Қолданбалы математика секциясы",
  title: "Табиғи тілді өңдеу алгоритмдерін зерттеу",
  subtitle: "Қазақ тіліндегі мәтіндердің пікір реңкін классификациялау арқылы талдау",
  authors: "Сафарбек Мадияр және Қали Ерасыл",
  className: "8 В",
  school: "НЗМ Алматы Наурызбай",
  tags: ["қазақ тілі", "пікір реңкі", "TF-IDF", "macro-F1", "negative recall"],
};

export const relevancePoints = [
  "Цифрлық мәтіндік деректер көлемі жыл сайын артып келеді.",
  "Қазақ тіліндегі NLP құралдарын дамыту маңызды ғылыми және практикалық бағыт.",
  "Қазақ тілі морфологиялық тұрғыдан күрделі, сондықтан мәтінді автоматты өңдеу бөлек зерттеуді қажет етеді.",
  "Пікір реңкін талдау пікірлерді, әлеуметтік желіні, чат-боттарды және білім беру платформаларын талдауға көмектеседі.",
];

export const researchGoal =
  "Қазақ тіліндегі мәтіндерді классификациялау үшін бірнеше классикалық NLP алгоритмдерін салыстырып, ең тиімді базалық модельді анықтау.";

export const researchTasks = [
  "NLP теориясына шолу жасау",
  "Деректер жиынын дайындау",
  "TF-IDF белгілерін шығару",
  "Модельдерді оқыту",
  "Дәлдік, macro-F1, weighted-F1, negative recall, positive recall арқылы бағалау",
  "Қателерді талдау",
];

export const datasetStats: StatItem[] = [
  { label: "Барлық мәтін", value: 134368, color: "text-cyanSoft" },
  { label: "Позитив", value: 110417, color: "text-mintSoft" },
  { label: "Негатив", value: 23951, color: "text-roseSoft" },
  { label: "Теңгерімсіздік қатынасы", value: 4.61, suffix: "x", color: "text-amberSoft" },
];

export const classDistribution = [
  { label: "Негатив", value: 23951, fill: "#f87171" },
  { label: "Позитив", value: 110417, fill: "#34d399" },
];

export const pipelineSteps = [
  { title: "Бастапқы мәтін", description: "Бастапқы мәтіндер деректер жиынынан алынады." },
  { title: "Тазалау", description: "text_cleaned бағанындағы тазаланған мәтін қолданылады." },
  { title: "TF-IDF", description: "Мәтіндер сандық векторларға айналады." },
  { title: "Модельді оқыту", description: "Классикалық базалық модельдер оқытылады." },
  { title: "Бағалау", description: "Дәлдік, macro-F1, weighted-F1 және recall есептеледі." },
  { title: "Нәтижелер", description: "Метрикалар, қателесу матрицасы және қате мысалдары сақталады." },
];

export const pipelineExplanations = [
  {
    title: "TF-IDF не істейді?",
    description:
      "TF-IDF мәтіндегі сөздерді сандық белгілерге айналдырады. Жиі кездесетін, бірақ барлық мәтінде бірдей емес сөздер модель үшін маңыздырақ болады.",
  },
  {
    title: "Бағалау қалай сақталады?",
    description:
      "Әр модельдің метрикалары, салыстыру кестесі, қателесу матрицасы және қате мысалдары results қалтасына сақталады.",
  },
];

export const modelInfos: ModelInfo[] = [
  {
    title: "Multinomial Naive Bayes",
    id: "tfidf_multinomial_nb",
    displayName: "TF-IDF + Multinomial Naive Bayes",
    shortName: "Naive Bayes",
    description: "Мәтіндегі сөз жиіліктеріне сүйенетін қарапайым әрі жылдам базалық модель.",
    icon: BrainCircuit,
  },
  {
    title: "Logistic Regression",
    id: "tfidf_logistic_regression_default",
    displayName: "TF-IDF + Logistic Regression",
    shortName: "Logistic Regression",
    description: "TF-IDF белгілері арқылы класстар арасындағы шекараны үйренетін сызықтық модель.",
    icon: LineChart,
  },
  {
    title: "Теңгерілген Logistic Regression",
    id: "tfidf_logistic_regression_balanced",
    displayName: "TF-IDF + теңгерілген Logistic Regression",
    shortName: "Теңгерілген Logistic Regression",
    description: "class_weight='balanced' параметрі арқылы сирек кездесетін негатив класына көбірек салмақ беріледі.",
    icon: Scale,
  },
  {
    title: "Теңгерілген LinearSVC",
    id: "tfidf_linear_svc_balanced",
    displayName: "TF-IDF + теңгерілген LinearSVC",
    shortName: "Теңгерілген LinearSVC",
    description: "Жоғары өлшемді мәтіндік белгілермен жақсы жұмыс істейтін сызықтық SVM түрі.",
    icon: SearchCheck,
  },
];

export const metricsExplanation = [
  { title: "Дәлдік (accuracy)", description: "Жалпы дұрыс жауаптар үлесі." },
  { title: "macro-F1", description: "Әр классты тең қарастыратын орташа F1." },
  { title: "weighted-F1", description: "Класс санына қарай салмақталған F1." },
  {
    title: "Negative recall",
    description: "Нақты негатив пікірлердің қаншасын модель дұрыс тапқанын көрсетеді.",
  },
  {
    title: "Positive recall",
    description: "Нақты позитив пікірлердің қаншасын модель дұрыс тапқанын көрсетеді.",
  },
];

export const modelMetrics: ModelMetric[] = [
  {
    model_name: "tfidf_multinomial_nb",
    label: "Naive Bayes",
    displayName: "TF-IDF + Multinomial Naive Bayes",
    shortName: "Naive Bayes",
    accuracy: 0.874228,
    macro_f1: 0.763238,
    weighted_f1: 0.867556,
    negative_recall: 0.531733,
    positive_recall: 0.948515,
  },
  {
    model_name: "tfidf_logistic_regression_default",
    label: "Logistic Regression",
    displayName: "TF-IDF + Logistic Regression",
    shortName: "Logistic Regression",
    accuracy: 0.880777,
    macro_f1: 0.760717,
    weighted_f1: 0.86979,
    negative_recall: 0.483716,
    positive_recall: 0.966899,
  },
  {
    model_name: "tfidf_logistic_regression_balanced",
    label: "Теңгерілген Logistic Regression",
    displayName: "TF-IDF + теңгерілген Logistic Regression",
    shortName: "Теңгерілген Logistic Regression",
    accuracy: 0.817444,
    macro_f1: 0.743919,
    weighted_f1: 0.832221,
    negative_recall: 0.789979,
    positive_recall: 0.823402,
  },
  {
    model_name: "tfidf_linear_svc_balanced",
    label: "Теңгерілген LinearSVC",
    displayName: "TF-IDF + теңгерілген LinearSVC",
    shortName: "Теңгерілген LinearSVC",
    accuracy: 0.808998,
    macro_f1: 0.732205,
    weighted_f1: 0.824488,
    negative_recall: 0.767223,
    positive_recall: 0.818058,
  },
];

export const metricLabels: Record<MetricKey, string> = {
  macro_f1: "Macro-F1",
  accuracy: "Дәлдік",
  negative_recall: "negative recall",
  positive_recall: "positive recall",
};

export const confusionMatrix = [
  [
    { label: "Нақты негатив, болжанған негатив", value: 2547, tone: "correct" },
    { label: "Нақты негатив, болжанған позитив", value: 2243, tone: "error" },
  ],
  [
    { label: "Нақты позитив, болжанған негатив", value: 1137, tone: "error" },
    { label: "Нақты позитив, болжанған позитив", value: 20947, tone: "correct" },
  ],
] as const;

export const keyFindings: Finding[] = [
  { title: "macro-F1 бойынша үздік", value: "TF-IDF + Multinomial Naive Bayes", icon: Sparkles },
  { title: "Дәлдік бойынша үздік", value: "TF-IDF + Logistic Regression", icon: BarChart3 },
  { title: "negative recall бойынша үздік", value: "TF-IDF + теңгерілген Logistic Regression", icon: ShieldAlert },
  { title: "positive recall бойынша үздік", value: "TF-IDF + Logistic Regression", icon: Target },
  { title: "Теңгерілген модельдің negative recall өсімі", value: "0.258246", icon: Scale },
  { title: "Теңгерілген модельдің macro-F1 төмендеуі", value: "0.019319", icon: LineChart },
];

export const useCases: UseCase[] = [
  { title: "Әлеуметтік желі пікірлерін талдау", icon: MessageSquareText },
  { title: "Тауар пікірлерін автоматты саралау", icon: ShoppingBag },
  { title: "Білім беру платформасындағы кері байланысты жіктеу", icon: GraduationCap },
  { title: "Чат-боттағы шағымдарды анықтау", icon: Bot },
  { title: "Қазақ тіліндегі аналитикалық жүйелерді дамыту", icon: BookOpen },
];

export const futureWork = [
  "BERT, mBERT, KazBERT модельдерін тәжірибе жүзінде тексеру",
  "Деректер балансын жақсарту",
  "Негатив мысалдарын көбейту",
  "Нақты қолдану сценарийлерінде тексеру",
  "Transformer модельдерін TF-IDF негізіндегі базалық модельдер нәтижелерімен салыстыру",
];
