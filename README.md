# Kazakh NLP Sentiment Analysis

English is the primary README language. Kazakh documentation is provided below.

## Overview

This repository contains a Kazakh sentiment analysis research project and a presentation website. The project focuses on binary sentiment classification for Kazakh review texts: `negative` vs `positive`.

The website presents the full experiment in an interactive format: dataset statistics, preprocessing notes, model pipeline, model comparison, metric cards, charts, confusion matrix, error examples, and research conclusions.

## Dataset

The dataset is based on KazSAnDRA: Kazakh Sentiment Analysis Dataset of Reviews and Attitudes.

To keep the repository compact, the dataset is committed as a zip archive:

```text
ml/code/dataset/kazsandra_dataset.zip
```

The archive contains the `dataset/` folder with CSV files for:

- polarity classification (PC): positive/negative sentiment;
- score classification (SC): rating prediction from 1 to 5.

The extracted folder `ml/code/dataset/dataset/` is intentionally ignored by git.

## Project Structure

```text
ml/
  kazakh_sentiment_pipeline.py
  requirements.txt
  results/
    class_distribution.png
    confusion_matrix.png
    error_examples.csv
    key_findings.json
    metrics.json
    metrics.txt
    metrics_bar.png
    model_comparison.csv
    model_comparison.txt
    model_comparison_markdown.md
    model_comparison_macro_f1.png
    research_summary_kz.txt
    research_summary_ru.txt
  code/dataset/
    kazsandra_dataset.zip
    KazSAnDRA-main/

website/
  src/
  public/
  dist/
  package.json
```

## Website

The frontend is built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts, and Lucide React.

Run locally:

```bash
cd website
npm install
npm run dev
```

Build for production:

```bash
cd website
npm run build
```

The production build is also included in `website/dist/`.

## ML Pipeline

The Python pipeline trains and evaluates classic TF-IDF baseline models for Kazakh sentiment classification.

Models:

- TF-IDF + Multinomial Naive Bayes
- TF-IDF + Logistic Regression
- TF-IDF + balanced Logistic Regression
- TF-IDF + balanced Linear SVC

Run the experiment:

```bash
unzip ml/code/dataset/kazsandra_dataset.zip -d ml/code/dataset
cd ml
pip install -r requirements.txt
python kazakh_sentiment_pipeline.py
```

## Terminal Sentiment Prediction

You can classify a new review directly from the terminal. If `results/sentiment_model.joblib` does not exist yet, the script trains the default model once and saves it.

Single review:

```bash
cd ml
python predict_sentiment.py "Өте жақсы қосымша, маған ұнады"
```

Interactive mode:

```bash
cd ml
python predict_sentiment.py
```

Example output:

```text
positive (1)
```

## Experiment Results

The polarity classification experiment uses 134368 texts:

- negative: 23951
- positive: 110417
- imbalance ratio: positive appears 4.61 times more often than negative

Because the dataset is imbalanced, accuracy is not enough to evaluate quality. The project reports accuracy, macro F1, weighted F1, negative recall, positive recall, and confusion matrix.

| Model | Accuracy | Macro F1 | Weighted F1 | Negative Recall | Positive Recall |
| --- | ---: | ---: | ---: | ---: | ---: |
| `tfidf_multinomial_nb` | 0.874228 | 0.763238 | 0.867556 | 0.531733 | 0.948515 |
| `tfidf_logistic_regression_default` | 0.880777 | 0.760717 | 0.869790 | 0.483716 | 0.966899 |
| `tfidf_logistic_regression_balanced` | 0.817444 | 0.743919 | 0.832221 | 0.789979 | 0.823402 |
| `tfidf_linear_svc_balanced` | 0.808998 | 0.732205 | 0.824488 | 0.767223 | 0.818058 |

Best model by macro F1:

```text
tfidf_multinomial_nb
accuracy = 0.874228
macro_f1 = 0.763238
weighted_f1 = 0.867556
negative_recall = 0.531733
positive_recall = 0.948515
```

Best model by negative recall:

```text
tfidf_logistic_regression_balanced
negative_recall = 0.789979
positive_recall = 0.823402
```

Main conclusion: balanced models detect the negative class better, but this reduces positive recall and can lower macro F1. The best model depends on whether the priority is overall balanced quality or stronger detection of negative reviews.

## Experiment Artifacts

All experiment outputs are included in `ml/results/`:

- `model_comparison.csv`, `model_comparison.txt`, `model_comparison_markdown.md`
- `metrics.json`, `metrics.txt`
- `key_findings.json`
- `error_examples.csv`
- `class_distribution.png`
- `metrics_bar.png`
- `confusion_matrix.png`
- `model_comparison_macro_f1.png`
- `research_summary_kz.txt`
- `research_summary_ru.txt`

## Қазақша

# Қазақ NLP Sentiment Analysis

Бұл репозиторийде қазақ тіліндегі мәтіндердің тоналдылығын анықтауға арналған зерттеу жобасы және презентациялық веб-сайт бар. Жоба binary sentiment classification міндетін шешеді: `negative` және `positive`.

Веб-сайтта эксперимент толық көрсетіледі: датасет статистикасы, preprocessing, модель pipeline, модельдерді салыстыру, метрикалар, графиктер, confusion matrix, қате мысалдары және зерттеу қорытындылары.

## Датасет

Деректер KazSAnDRA датасетінен алынған: Kazakh Sentiment Analysis Dataset of Reviews and Attitudes.

Репозиторий ықшам болуы үшін датасет zip архив түрінде сақталған:

```text
ml/code/dataset/kazsandra_dataset.zip
```

Архив ішінде `dataset/` қалтасы бар. Ол келесі CSV файлдарын қамтиды:

- polarity classification (PC): positive/negative sentiment;
- score classification (SC): 1-ден 5-ке дейінгі рейтингті болжау.

Ашылған `ml/code/dataset/dataset/` қалтасы git-ке қосылмайды.

## Жоба құрылымы

`ml/` қалтасында Python pipeline, requirements және барлық эксперимент нәтижелері орналасқан. `website/` қалтасында React + TypeScript арқылы жасалған веб-сайт орналасқан. `website/dist/` ішінде production build бар.

## Сайтты іске қосу

```bash
cd website
npm install
npm run dev
```

Production build:

```bash
cd website
npm run build
```

## ML Pipeline

Python pipeline қазақ мәтіндерінің sentiment classification міндеті үшін TF-IDF baseline модельдерін оқытады және бағалайды.

Модельдер:

- TF-IDF + Multinomial Naive Bayes
- TF-IDF + Logistic Regression
- TF-IDF + balanced Logistic Regression
- TF-IDF + balanced Linear SVC

Экспериментті іске қосу:

```bash
unzip ml/code/dataset/kazsandra_dataset.zip -d ml/code/dataset
cd ml
pip install -r requirements.txt
python kazakh_sentiment_pipeline.py
```

## Терминал арқылы sentiment анықтау

Жаңа пікірді терминалдан енгізіп, модельдің жауабын көруге болады. Егер `results/sentiment_model.joblib` әлі жоқ болса, скрипт default модельді бір рет оқытып, сақтайды.

Бір пікірді тексеру:

```bash
cd ml
python predict_sentiment.py "Өте жақсы қосымша, маған ұнады"
```

Интерактив режим:

```bash
cd ml
python predict_sentiment.py
```

Мысал нәтиже:

```text
positive (1)
```

## Эксперимент нәтижелері

Polarity classification экспериментінде 134368 мәтін қолданылды:

- negative: 23951
- positive: 110417
- imbalance ratio: positive класы negative класынан 4.61 есе жиі кездеседі

Датасет теңгерімсіз болғандықтан, accuracy жалғыз метрика ретінде жеткіліксіз. Сондықтан жобада accuracy, macro F1, weighted F1, negative recall, positive recall және confusion matrix көрсетіледі.

| Модель | Accuracy | Macro F1 | Weighted F1 | Negative Recall | Positive Recall |
| --- | ---: | ---: | ---: | ---: | ---: |
| `tfidf_multinomial_nb` | 0.874228 | 0.763238 | 0.867556 | 0.531733 | 0.948515 |
| `tfidf_logistic_regression_default` | 0.880777 | 0.760717 | 0.869790 | 0.483716 | 0.966899 |
| `tfidf_logistic_regression_balanced` | 0.817444 | 0.743919 | 0.832221 | 0.789979 | 0.823402 |
| `tfidf_linear_svc_balanced` | 0.808998 | 0.732205 | 0.824488 | 0.767223 | 0.818058 |

Macro F1 бойынша ең жақсы модель: `tfidf_multinomial_nb`.

Negative recall бойынша ең жақсы модель: `tfidf_logistic_regression_balanced`.

Негізгі қорытынды: balanced модельдер negative класын жақсырақ табады, бірақ positive recall төмендейді және macro F1 азаюы мүмкін. Сондықтан ең жақсы модель жобаның мақсатына байланысты таңдалады: жалпы сапа ма, әлде negative пікірлерді көбірек табу ма.

## Нәтиже файлдары

Барлық эксперимент нәтижелері `ml/results/` қалтасында сақталған:

- модельдерді салыстыру кестелері;
- JSON және TXT метрикалар;
- негізгі қорытындылар;
- қате мысалдары;
- class distribution, metrics, confusion matrix және macro F1 графиктері;
- қазақша және орысша зерттеу summary файлдары.
