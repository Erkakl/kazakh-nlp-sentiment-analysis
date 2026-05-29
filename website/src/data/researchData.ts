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
  | "definitions"
  | "relevance"
  | "goal"
  | "dataset"
  | "pipeline"
  | "working-principle"
  | "vector-formulas"
  | "classification-formulas"
  | "evaluation-formulas"
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
  { id: "definitions", label: "Анықтама" },
  { id: "relevance", label: "Өзектілік" },
  { id: "goal", label: "Мақсат" },
  { id: "dataset", label: "Деректер" },
  { id: "pipeline", label: "Pipeline" },
  { id: "working-principle", label: "Жұмыс принципі" },
  { id: "vector-formulas", label: "Векторлау формулалары" },
  { id: "classification-formulas", label: "Классификация формулалары" },
  { id: "evaluation-formulas", label: "Бағалау формулалары" },
  { id: "models", label: "Модельдер" },
  { id: "metrics", label: "Метрикалар" },
  { id: "results", label: "Нәтижелер" },
  { id: "confusion", label: "Қателесу матрицасы" },
  { id: "findings", label: "Негізгі қорытындылар" },
  { id: "use-cases", label: "Қолдану бағыттары" },
  { id: "future-work", label: "Болашақ жұмыс" },
  { id: "conclusion", label: "Қорытынды" },
];

export const definitionGroups = [
  {
    title: "TF-IDF",
    items: [
      {
        term: "TF-IDF",
        description:
          "Мәтіндегі маңызды сөздерді анықтап, мәтінді машиналық оқыту модельдеріне арналған сандық форматқа түрлендіретін әдіс.",
      },
      {
        term: "TF (Term Frequency)",
        description:
          "Белгілі бір сөздің бір мәтін ішінде қаншалықты жиі кездесетінін көрсетеді. Сөз мәтінде жиі кездессе, оның TF мәні жоғары болады.",
      },
      {
        term: "IDF (Inverse Document Frequency)",
        description:
          "Сөздің барлық мәтіндер арасында қаншалықты сирек немесе ерекше екенін көрсетеді. Барлық жерде кездесетін сөздердің салмағы төмендейді.",
      },
      {
        term: "Сандық вектор",
        description:
          "Модель мәтінді тікелей түсінбейді, сондықтан TF-IDF әр пікірді сандар жиынына айналдырады. Осы сандар арқылы модель positive немесе negative классын үйренеді.",
      },
    ],
  },
  {
    title: "Оқытылған модельдер",
    items: [
      {
        term: "Multinomial Naive Bayes",
        description:
          "Сөздердің жиілігіне сүйенетін жылдам baseline модель. Мәтін классификациясында жиі қолданылады.",
      },
      {
        term: "Logistic Regression",
        description:
          "TF-IDF белгілерін қолданып, мәтіннің positive немесе negative болу ықтималдығын есептейтін сызықтық модель.",
      },
      {
        term: "Balanced Logistic Regression",
        description:
          "Класстар теңгерімсіз болғанда сирек кездесетін класқа көбірек салмақ береді. Бұл жобада negative пікірлерді жақсырақ табуға көмектеседі.",
      },
      {
        term: "Balanced LinearSVC",
        description:
          "Мәтіндік векторлармен жақсы жұмыс істейтін сызықтық SVM моделі. Balanced нұсқасы negative және positive класстардың теңгерімсіздігін ескереді.",
      },
    ],
  },
  {
    title: "Бағалау метрикалары",
    items: [
      {
        term: "Accuracy",
        description:
          "Барлық болжамдардың ішінен қаншасы дұрыс болғанын көрсетеді. Бірақ класстар теңгерімсіз болса, accuracy жалғыз өзі жеткіліксіз.",
      },
      {
        term: "Macro-F1",
        description:
          "Әр класстың F1-score мәнін жеке есептеп, оларды тең салмақпен орташа алады. Negative және positive класстарға бірдей мән береді.",
      },
      {
        term: "Weighted-F1",
        description:
          "F1-score мәндерін класстардың санына қарай салмақтап орташа есептейді. Үлкен класс нәтижеге көбірек әсер етеді.",
      },
      {
        term: "Negative recall",
        description:
          "Нақты negative пікірлердің қаншасын модель дұрыс negative деп тапқанын көрсетеді. Бұл жаман пікірлерді өткізіп алмау үшін маңызды.",
      },
      {
        term: "Positive recall",
        description:
          "Нақты positive пікірлердің қаншасын модель дұрыс positive деп тапқанын көрсетеді.",
      },
    ],
  },
  {
    title: "Қосымша ұғымдар",
    items: [
      {
        term: "Sentiment analysis",
        description:
          "Мәтіндегі пікір реңкін анықтау міндеті. Бұл жобада пікір positive немесе negative болып бөлінеді.",
      },
      {
        term: "Dataset imbalance",
        description:
          "Класстар санының тең болмауы. KazSAnDRA polarity деректерінде positive пікірлер negative пікірлерден 4.61 есе көп.",
      },
      {
        term: "Confusion matrix",
        description:
          "Модельдің дұрыс және қате жауаптарын кесте түрінде көрсетеді. Ол қай класста қате көп екенін көруге көмектеседі.",
      },
      {
        term: "Baseline model",
        description:
          "Кейінгі күрделі модельдермен салыстыруға арналған бастапқы қарапайым модель. Бұл жобада классикалық TF-IDF модельдері baseline ретінде қолданылды.",
      },
    ],
  },
];

export const formulaGroups = [
  {
    title: "TF-IDF формулалары",
    formulas: [
      {
        name: "TF",
        expression: "TF(t, d) = n(t, d) / |d|",
        explanation:
          "t сөзінің d мәтінінде қаншалықты жиі кездесетінін көрсетеді. n(t, d) - сөздің саны, |d| - мәтіндегі барлық сөз саны.",
      },
      {
        name: "IDF",
        expression: "IDF(t) = log(N / DF(t))",
        explanation:
          "t сөзінің барлық мәтіндер ішінде қаншалықты сирек екенін көрсетеді. N - барлық мәтін саны, DF(t) - осы сөз кездесетін мәтіндер саны.",
      },
      {
        name: "TF-IDF",
        expression: "TF-IDF(t, d) = TF(t, d) * IDF(t)",
        explanation:
          "Сөз бір мәтінде жиі кездесіп, бірақ барлық мәтінде тым жиі кездеспесе, оның TF-IDF салмағы жоғары болады.",
      },
    ],
  },
  {
    title: "Confusion matrix белгілері",
    formulas: [
      {
        name: "TP",
        expression: "True Positive",
        explanation: "Positive пікірді модель positive деп дұрыс тапты.",
      },
      {
        name: "TN",
        expression: "True Negative",
        explanation: "Negative пікірді модель negative деп дұрыс тапты.",
      },
      {
        name: "FP",
        expression: "False Positive",
        explanation: "Negative пікірді модель қате positive деп белгіледі.",
      },
      {
        name: "FN",
        expression: "False Negative",
        explanation: "Positive пікірді модель қате negative деп белгіледі.",
      },
    ],
  },
  {
    title: "Бағалау метрикаларының формулалары",
    formulas: [
      {
        name: "Accuracy",
        expression: "Accuracy = (TP + TN) / (TP + TN + FP + FN)",
        explanation: "Барлық мәтіндердің ішінен дұрыс классификацияланған үлесін көрсетеді.",
      },
      {
        name: "Precision",
        expression: "Precision = TP / (TP + FP)",
        explanation: "Модель positive деп белгілеген пікірлердің қаншасы шынымен positive екенін көрсетеді.",
      },
      {
        name: "Recall",
        expression: "Recall = TP / (TP + FN)",
        explanation: "Шынайы positive пікірлердің қаншасын модель дұрыс тапқанын көрсетеді.",
      },
      {
        name: "F1-score",
        expression: "F1 = 2 * Precision * Recall / (Precision + Recall)",
        explanation: "Precision мен recall арасындағы теңгерімді көрсететін орташа метрика.",
      },
      {
        name: "Macro-F1",
        expression: "Macro-F1 = (F1_negative + F1_positive) / 2",
        explanation: "Negative және positive класстарын тең салмақпен қарастырады.",
      },
      {
        name: "Weighted-F1",
        expression: "Weighted-F1 = sum(F1_c * support_c) / sum(support_c)",
        explanation: "Әр класс F1 мәнін сол кластағы мәтін санына қарай салмақтап есептейді.",
      },
      {
        name: "Negative recall",
        expression: "Negative recall = TN / (TN + FP)",
        explanation: "Шынайы negative пікірлердің қаншасын модель дұрыс negative деп тапқанын көрсетеді.",
      },
      {
        name: "Positive recall",
        expression: "Positive recall = TP / (TP + FN)",
        explanation: "Шынайы positive пікірлердің қаншасын модель дұрыс positive деп тапқанын көрсетеді.",
      },
    ],
  },
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

export const workingPrinciples = [
  {
    title: "1. Мәтінді қабылдау",
    description:
      "Жүйе қазақ тіліндегі пікірді алады. Мысалы, қолданушының әлеуметтік желідегі немесе тауар туралы жазған мәтіні бастапқы дерек болады.",
  },
  {
    title: "2. Мәтінді тазалау",
    description:
      "Артық таңбалар, қажетсіз бос орындар және модельге кедергі болатын элементтер азайтылады. Нәтижесінде сөздер біркелкі форматқа келеді.",
  },
  {
    title: "3. Сандық векторға айналдыру",
    description:
      "Компьютер мәтінді тікелей түсінбейді, сондықтан әр пікір TF-IDF арқылы сандар жиынына айналады. Әр сан белгілі бір сөздің осы пікір үшін қаншалықты маңызды екенін көрсетеді.",
  },
  {
    title: "4. Модель арқылы болжау",
    description:
      "Оқытылған модель TF-IDF векторын қабылдап, пікірдің positive немесе negative классына жату ықтималдығын есептейді.",
  },
  {
    title: "5. Нәтижені бағалау",
    description:
      "Болжамдар нақты жауаптармен салыстырылады. Accuracy, precision, recall және F1-score модельдің қай жерде жақсы, қай жерде әлсіз екенін көрсетеді.",
  },
];

export const workingFormulaGroups = [
  {
    title: "Мәтінді векторлау",
    formulas: [
      {
        name: "Term Frequency",
        expression: "TF(t, d) = n(t, d) / |d|",
        meaning: "Сөздің бір мәтін ішіндегі жиілігін есептейді.",
        variables: [
          { symbol: "t", description: "қарастырылып отырған сөз" },
          { symbol: "d", description: "бір мәтін немесе бір пікір" },
          { symbol: "n(t, d)", description: "t сөзінің d мәтінінде неше рет кездескені" },
          { symbol: "|d|", description: "d мәтініндегі барлық сөз саны" },
          { symbol: "TF(t, d)", description: "t сөзінің d мәтініндегі салыстырмалы жиілігі" },
        ],
      },
      {
        name: "Inverse Document Frequency",
        expression: "IDF(t) = log(N / DF(t))",
        meaning: "Сөздің барлық мәтіндер арасында қаншалықты сирек екенін өлшейді.",
        variables: [
          { symbol: "N", description: "деректер жиынындағы барлық мәтін саны" },
          { symbol: "DF(t)", description: "t сөзі кездесетін мәтіндер саны" },
          { symbol: "log", description: "логарифм, өте үлкен айырмашылықтарды ықшамдау үшін қолданылады" },
          { symbol: "IDF(t)", description: "t сөзінің сиректік салмағы" },
        ],
      },
      {
        name: "TF-IDF салмағы",
        expression: "w(t, d) = TF(t, d) * IDF(t)",
        meaning: "Сөздің нақты мәтіндегі жалпы маңыздылығын береді.",
        variables: [
          { symbol: "w(t, d)", description: "t сөзінің d мәтініндегі соңғы TF-IDF салмағы" },
          { symbol: "TF(t, d)", description: "сөздің мәтін ішіндегі жиілігі" },
          { symbol: "IDF(t)", description: "сөздің барлық мәтіндер бойынша сиректік салмағы" },
        ],
      },
    ],
  },
  {
    title: "Классификация",
    formulas: [
      {
        name: "Логистикалық ықтималдық",
        expression: "P(y = 1 | x) = 1 / (1 + e^(-z)), z = b + sum(w_i * x_i)",
        meaning:
          "Logistic Regression мәтіннің positive классына жату ықтималдығын есептейді. Ықтималдық 0 мен 1 арасында болады.",
        variables: [
          { symbol: "x", description: "мәтіннің TF-IDF векторы" },
          { symbol: "x_i", description: "вектордағы i-белгінің мәні, яғни бір сөздің TF-IDF салмағы" },
          { symbol: "w_i", description: "модель үйренген i-белгінің салмағы" },
          { symbol: "b", description: "модельдің бос мүшесі, бастапқы ығысу мәні" },
          { symbol: "z", description: "барлық салмақталған белгілердің қосындысы" },
          { symbol: "e", description: "натурал логарифм негізі, шамамен 2.718" },
          { symbol: "P(y = 1 | x)", description: "x мәтіні positive класс болуының ықтималдығы" },
          { symbol: "y", description: "мәтіннің класы: 1 - positive, 0 - negative" },
        ],
      },
      {
        name: "Сызықтық SVM шешімі",
        expression: "score(x) = b + sum(w_i * x_i)",
        meaning:
          "LinearSVC мәтінді екі класстың біріне бөлу үшін шешім шекарасынан қай жақта тұрғанын есептейді.",
        variables: [
          { symbol: "score(x)", description: "мәтіннің шешім шекарасына қатысты бағасы" },
          { symbol: "x_i", description: "TF-IDF векторындағы i-белгі" },
          { symbol: "w_i", description: "сол белгінің модельдегі салмағы" },
          { symbol: "b", description: "шешім шекарасын жылжытатын бос мүше" },
        ],
      },
    ],
  },
  {
    title: "Бағалау",
    formulas: [
      {
        name: "Accuracy",
        expression: "Accuracy = (TP + TN) / (TP + TN + FP + FN)",
        meaning: "Барлық болжамның ішінен дұрыс жауаптардың үлесін көрсетеді.",
        variables: [
          { symbol: "TP", description: "positive пікірді positive деп дұрыс табу" },
          { symbol: "TN", description: "negative пікірді negative деп дұрыс табу" },
          { symbol: "FP", description: "negative пікірді қате positive деп белгілеу" },
          { symbol: "FN", description: "positive пікірді қате negative деп белгілеу" },
        ],
      },
      {
        name: "Precision",
        expression: "Precision = TP / (TP + FP)",
        meaning: "Модель positive деді деген болжамдардың қаншасы шынымен positive екенін көрсетеді.",
        variables: [
          { symbol: "TP", description: "дұрыс positive болжамдар саны" },
          { symbol: "FP", description: "қате positive болжамдар саны" },
        ],
      },
      {
        name: "Recall",
        expression: "Recall = TP / (TP + FN)",
        meaning: "Шынайы positive пікірлердің қаншасын модель тауып алғанын көрсетеді.",
        variables: [
          { symbol: "TP", description: "табылған positive пікірлер саны" },
          { symbol: "FN", description: "өткізіліп кеткен positive пікірлер саны" },
        ],
      },
      {
        name: "F1-score",
        expression: "F1 = 2 * Precision * Recall / (Precision + Recall)",
        meaning: "Precision мен recall арасындағы теңгерімді бір санмен көрсетеді.",
        variables: [
          { symbol: "Precision", description: "positive болжамдардың нақтылығы" },
          { symbol: "Recall", description: "positive пікірлерді табу толықтығы" },
          { symbol: "F1", description: "precision және recall теңгерімінің көрсеткіші" },
        ],
      },
    ],
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
