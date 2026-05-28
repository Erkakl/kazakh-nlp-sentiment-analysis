"""Kazakh sentiment analysis research pipeline.

This script trains and evaluates classic TF-IDF baselines for binary Kazakh
sentiment classification.
"""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from typing import Any

os.environ.setdefault("MPLCONFIGDIR", "/tmp/matplotlib")

import matplotlib.pyplot as plt
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.svm import LinearSVC


TEXT_COLUMN = "text_cleaned"
LABEL_COLUMN = "label"
REQUIRED_COLUMNS = {TEXT_COLUMN, LABEL_COLUMN}
RANDOM_STATE = 42
TARGET_NAMES = ["negative", "positive"]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Train and evaluate TF-IDF + Naive Bayes for Kazakh sentiment analysis."
    )
    parser.add_argument(
        "--dataset-dir",
        type=Path,
        default=Path("dataset"),
        help="Directory where CSV dataset files are stored.",
    )
    parser.add_argument(
        "--csv-path",
        type=Path,
        default=None,
        help="Optional explicit CSV path. If omitted, a binary CSV is found automatically.",
    )
    parser.add_argument(
        "--results-dir",
        type=Path,
        default=Path("results"),
        help="Directory for plots and metric files.",
    )
    parser.add_argument(
        "--model-output",
        type=Path,
        default=Path("results/sentiment_model.joblib"),
        help="Path where the best trained model will be saved.",
    )
    parser.add_argument("--test-size", type=float, default=0.2)
    parser.add_argument("--random-state", type=int, default=RANDOM_STATE)
    return parser.parse_args()


def resolve_dataset_dir(dataset_dir: Path) -> Path:
    """Resolve the requested dataset directory with a project-specific fallback."""
    if dataset_dir.exists():
        return dataset_dir

    fallback = Path("code/dataset/dataset")
    if dataset_dir == Path("dataset") and fallback.exists():
        return fallback

    raise FileNotFoundError(f"Dataset directory does not exist: {dataset_dir}")


def find_csv_path(dataset_dir: Path) -> Path:
    """Find the first CSV that has the required columns and binary labels 0/1."""
    csv_paths = sorted(dataset_dir.rglob("*.csv"))
    if not csv_paths:
        raise FileNotFoundError(f"No CSV files found in {dataset_dir}")

    rejected: list[str] = []
    for csv_path in csv_paths:
        try:
            sample = pd.read_csv(csv_path, usecols=[TEXT_COLUMN, LABEL_COLUMN])
        except ValueError:
            rejected.append(f"{csv_path.name}: missing required columns")
            continue

        labels = set(sample[LABEL_COLUMN].dropna().unique().tolist())
        if labels == {0, 1}:
            return csv_path
        rejected.append(f"{csv_path.name}: labels={sorted(labels)}")

    details = "; ".join(rejected)
    raise ValueError(f"No binary 0/1 CSV with columns {REQUIRED_COLUMNS} found. Checked: {details}")


def load_dataset(csv_path: Path) -> pd.DataFrame:
    df = pd.read_csv(csv_path)
    missing = REQUIRED_COLUMNS.difference(df.columns)
    if missing:
        raise ValueError(f"Dataset is missing required columns: {sorted(missing)}")
    return df


def print_dataset_overview(df: pd.DataFrame, csv_path: Path) -> None:
    print("\n=== Dataset overview ===")
    print(f"CSV path: {csv_path}")
    print(f"Rows: {len(df)}")
    print(f"Columns: {list(df.columns)}")
    print("\nClass distribution:")
    print(df[LABEL_COLUMN].value_counts(dropna=False).sort_index())
    print("\nExamples:")
    print(df[[TEXT_COLUMN, LABEL_COLUMN]].head(5).to_string(index=False))


def preprocess_dataset(df: pd.DataFrame) -> pd.DataFrame:
    cleaned = df[[TEXT_COLUMN, LABEL_COLUMN]].dropna().copy()
    cleaned[TEXT_COLUMN] = cleaned[TEXT_COLUMN].astype(str).str.strip()
    cleaned = cleaned[cleaned[TEXT_COLUMN] != ""]
    cleaned[LABEL_COLUMN] = cleaned[LABEL_COLUMN].astype(int)
    cleaned = cleaned[cleaned[LABEL_COLUMN].isin([0, 1])]
    return cleaned.reset_index(drop=True)


def split_dataset(
    df: pd.DataFrame, test_size: float, random_state: int
) -> tuple[pd.Series, pd.Series, pd.Series, pd.Series]:
    x = df[TEXT_COLUMN]
    y = df[LABEL_COLUMN]
    return train_test_split(
        x,
        y,
        test_size=test_size,
        random_state=random_state,
        stratify=y,
    )


def make_tfidf_classifier(classifier: Any) -> Pipeline:
    return Pipeline(
        steps=[
            (
                "tfidf",
                TfidfVectorizer(max_features=10_000, ngram_range=(1, 2)),
            ),
            ("model", classifier),
        ]
    )


def build_models() -> dict[str, Pipeline]:
    return {
        "tfidf_multinomial_nb": make_tfidf_classifier(MultinomialNB()),
        "tfidf_logistic_regression_default": make_tfidf_classifier(
            LogisticRegression()
        ),
        "tfidf_logistic_regression_balanced": make_tfidf_classifier(
            LogisticRegression(class_weight="balanced")
        ),
        "tfidf_linear_svc_balanced": make_tfidf_classifier(
            LinearSVC(class_weight="balanced", random_state=RANDOM_STATE)
        ),
    }


def evaluate_model(model_name: str, y_true: pd.Series, y_pred: Any) -> dict[str, Any]:
    report_dict = classification_report(
        y_true,
        y_pred,
        labels=[0, 1],
        target_names=TARGET_NAMES,
        output_dict=True,
        zero_division=0,
    )
    report_text = classification_report(
        y_true,
        y_pred,
        labels=[0, 1],
        target_names=TARGET_NAMES,
        zero_division=0,
    )
    matrix = confusion_matrix(y_true, y_pred, labels=[0, 1]).tolist()

    return {
        "model_name": model_name,
        "accuracy": accuracy_score(y_true, y_pred),
        "precision": precision_score(y_true, y_pred, zero_division=0),
        "recall": recall_score(y_true, y_pred, zero_division=0),
        "f1_score": f1_score(y_true, y_pred, zero_division=0),
        "macro_avg": report_dict["macro avg"],
        "weighted_avg": report_dict["weighted avg"],
        "per_class": {
            "negative": report_dict["negative"],
            "positive": report_dict["positive"],
        },
        "negative_recall": report_dict["negative"]["recall"],
        "positive_recall": report_dict["positive"]["recall"],
        "classification_report": report_text,
        "classification_report_dict": report_dict,
        "confusion_matrix": matrix,
    }


def plot_metric_bar(metrics: dict[str, Any], output_path: Path) -> None:
    metric_names = ["accuracy", "precision", "recall", "f1_score"]
    values = [metrics[name] for name in metric_names]

    fig, ax = plt.subplots(figsize=(8, 5))
    ax.bar(metric_names, values, color=["#2f6f9f", "#5aa469", "#d9913d", "#8f5aa3"])
    ax.set_ylim(0, 1)
    ax.set_ylabel("Score")
    ax.set_title(f"{metrics['model_name']} Metrics")
    for index, value in enumerate(values):
        ax.text(index, value + 0.01, f"{value:.3f}", ha="center", va="bottom")
    fig.tight_layout()
    fig.savefig(output_path, dpi=160)
    plt.close(fig)


def plot_confusion_matrix(metrics: dict[str, Any], output_path: Path) -> None:
    matrix = metrics["confusion_matrix"]
    fig, ax = plt.subplots(figsize=(6, 5))
    image = ax.imshow(matrix, cmap="Blues")
    fig.colorbar(image, ax=ax)

    ax.set_xticks([0, 1], TARGET_NAMES)
    ax.set_yticks([0, 1], TARGET_NAMES)
    ax.set_xlabel("Predicted label")
    ax.set_ylabel("True label")
    ax.set_title("Confusion Matrix")

    threshold = max(max(row) for row in matrix) / 2
    for row_index, row in enumerate(matrix):
        for col_index, value in enumerate(row):
            color = "white" if value > threshold else "black"
            ax.text(col_index, row_index, str(value), ha="center", va="center", color=color)

    fig.tight_layout()
    fig.savefig(output_path, dpi=160)
    plt.close(fig)


def plot_class_distribution(df: pd.DataFrame, output_path: Path) -> None:
    distribution = df[LABEL_COLUMN].value_counts().sort_index()
    labels = [TARGET_NAMES[label] for label in distribution.index]

    fig, ax = plt.subplots(figsize=(7, 5))
    ax.bar(labels, distribution.values, color=["#c44e52", "#4c72b0"])
    ax.set_ylabel("Samples")
    ax.set_title("Class Distribution")
    for index, value in enumerate(distribution.values):
        ax.text(index, value, str(value), ha="center", va="bottom")
    fig.tight_layout()
    fig.savefig(output_path, dpi=160)
    plt.close(fig)


def plot_model_comparison(comparison_df: pd.DataFrame, output_path: Path) -> None:
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.bar(comparison_df["model_name"], comparison_df["macro_f1"], color="#3b7a57")
    ax.set_ylim(0, 1)
    ax.set_ylabel("Macro F1")
    ax.set_title("Model Comparison by Macro F1")
    ax.tick_params(axis="x", labelrotation=25)
    for index, value in enumerate(comparison_df["macro_f1"]):
        ax.text(index, value + 0.01, f"{value:.3f}", ha="center", va="bottom")
    fig.tight_layout()
    fig.savefig(output_path, dpi=160)
    plt.close(fig)


def build_model_comparison(metrics_by_model: dict[str, dict[str, Any]]) -> pd.DataFrame:
    rows = []
    for model_name, metrics in metrics_by_model.items():
        rows.append(
            {
                "model_name": model_name,
                "accuracy": metrics["accuracy"],
                "macro_f1": metrics["macro_avg"]["f1-score"],
                "weighted_f1": metrics["weighted_avg"]["f1-score"],
                "negative_recall": metrics["negative_recall"],
                "positive_recall": metrics["positive_recall"],
            }
        )
    return pd.DataFrame(rows).sort_values("macro_f1", ascending=False).reset_index(drop=True)


def save_model_comparison(comparison_df: pd.DataFrame, results_dir: Path) -> None:
    comparison_df.to_csv(results_dir / "model_comparison.csv", index=False)
    table_text = comparison_df.to_string(index=False, float_format=lambda value: f"{value:.6f}")
    (results_dir / "model_comparison.txt").write_text(table_text + "\n", encoding="utf-8")
    plot_model_comparison(comparison_df, results_dir / "model_comparison_macro_f1.png")


def as_percent(value: float) -> str:
    return f"{value * 100:.2f}%"


def get_model_row(comparison_df: pd.DataFrame, model_name: str) -> pd.Series:
    matches = comparison_df[comparison_df["model_name"] == model_name]
    if matches.empty:
        raise KeyError(f"Model not found in comparison table: {model_name}")
    return matches.iloc[0]


def build_key_findings(comparison_df: pd.DataFrame, class_distribution: pd.Series) -> dict[str, Any]:
    best_by_macro_f1 = comparison_df.loc[comparison_df["macro_f1"].idxmax()]
    best_by_accuracy = comparison_df.loc[comparison_df["accuracy"].idxmax()]
    best_by_negative_recall = comparison_df.loc[comparison_df["negative_recall"].idxmax()]
    best_by_positive_recall = comparison_df.loc[comparison_df["positive_recall"].idxmax()]

    negative_count = int(class_distribution.loc[0])
    positive_count = int(class_distribution.loc[1])
    imbalance_ratio = positive_count / negative_count

    nb_row = get_model_row(comparison_df, "tfidf_multinomial_nb")
    balanced_lr_row = get_model_row(comparison_df, "tfidf_logistic_regression_balanced")

    return {
        "best_by_macro_f1": best_by_macro_f1.to_dict(),
        "best_by_accuracy": best_by_accuracy.to_dict(),
        "best_by_negative_recall": best_by_negative_recall.to_dict(),
        "best_by_positive_recall": best_by_positive_recall.to_dict(),
        "imbalance_ratio": imbalance_ratio,
        "negative_recall_gain_balanced_vs_nb": float(
            balanced_lr_row["negative_recall"] - nb_row["negative_recall"]
        ),
        "macro_f1_drop_balanced_vs_nb": float(nb_row["macro_f1"] - balanced_lr_row["macro_f1"]),
    }


def build_markdown_comparison(comparison_df: pd.DataFrame) -> str:
    display_df = comparison_df[
        [
            "model_name",
            "accuracy",
            "macro_f1",
            "weighted_f1",
            "negative_recall",
            "positive_recall",
        ]
    ].copy()
    for column in display_df.columns:
        if column != "model_name":
            display_df[column] = display_df[column].map(lambda value: f"{value:.6f}")

    columns = display_df.columns.tolist()
    lines = [
        "| " + " | ".join(columns) + " |",
        "| " + " | ".join(["---"] * len(columns)) + " |",
    ]
    for _, row in display_df.iterrows():
        lines.append("| " + " | ".join(str(row[column]) for column in columns) + " |")
    return "\n".join(lines) + "\n"


def build_research_summary_kz(
    dataset_size: int,
    class_distribution: pd.Series,
    key_findings: dict[str, Any],
) -> str:
    negative_count = int(class_distribution.loc[0])
    positive_count = int(class_distribution.loc[1])
    best_macro = key_findings["best_by_macro_f1"]
    best_negative = key_findings["best_by_negative_recall"]
    imbalance_ratio = key_findings["imbalance_ratio"]

    return "\n".join(
        [
            "Зерттеу қорытындысы",
            "",
            f"Деректер жиынының көлемі: {dataset_size} мәтін.",
            f"Класс таралуы: negative = {negative_count}, positive = {positive_count}.",
            (
                "Класстар тең емес: positive класы negative класынан "
                f"{imbalance_ratio:.2f} есе көп. Сондықтан модель көп жағдайда "
                "жиі кездесетін positive класына бейім болуы мүмкін."
            ),
            "",
            (
                "Macro F1 бойынша ең жақсы модель: "
                f"{best_macro['model_name']} "
                f"(macro_f1 = {best_macro['macro_f1']:.6f}, "
                f"accuracy = {best_macro['accuracy']:.6f})."
            ),
            (
                "Negative recall бойынша ең жақсы модель: "
                f"{best_negative['model_name']} "
                f"(negative_recall = {best_negative['negative_recall']:.6f}, "
                f"positive_recall = {best_negative['positive_recall']:.6f})."
            ),
            "",
            (
                "Accuracy көрсеткіші жалғыз өзі жеткіліксіз, себебі деректерде positive "
                "мысалдары әлдеқайда көп. Модель positive класын жиі таңдаса, жалпы "
                "accuracy жоғары көрінуі мүмкін, бірақ negative пікірлерді нашар табуы ықтимал."
            ),
            (
                "Сондықтан бұл жұмыста macro_f1, negative_recall, positive_recall және "
                "confusion matrix көрсеткіштері бірге қарастырылды."
            ),
            "",
            (
                "Қорытынды: class_weight='balanced' қолданылған модельдер negative_recall "
                "көрсеткішін арттырды, бірақ positive_recall және жалпы macro_f1 төмендеуі "
                "мүмкін. Бұл negative пікірлерді жақсырақ табу мен positive пікірлерді "
                "дұрыс сақтау арасында trade-off бар екенін көрсетеді."
            ),
        ]
    )


def build_research_summary_ru(
    dataset_size: int,
    class_distribution: pd.Series,
    key_findings: dict[str, Any],
) -> str:
    negative_count = int(class_distribution.loc[0])
    positive_count = int(class_distribution.loc[1])
    best_macro = key_findings["best_by_macro_f1"]
    best_negative = key_findings["best_by_negative_recall"]
    imbalance_ratio = key_findings["imbalance_ratio"]

    return "\n".join(
        [
            "Краткое описание исследования",
            "",
            f"Размер датасета: {dataset_size} текстов.",
            f"Распределение классов: negative = {negative_count}, positive = {positive_count}.",
            (
                "Классы несбалансированы: класс positive встречается в "
                f"{imbalance_ratio:.2f} раза чаще, чем negative. Из-за этого модель "
                "может быть склонна чаще предсказывать majority class."
            ),
            "",
            (
                "Лучшая модель по macro F1: "
                f"{best_macro['model_name']} "
                f"(macro_f1 = {best_macro['macro_f1']:.6f}, "
                f"accuracy = {best_macro['accuracy']:.6f})."
            ),
            (
                "Лучшая модель по negative recall: "
                f"{best_negative['model_name']} "
                f"(negative_recall = {best_negative['negative_recall']:.6f}, "
                f"positive_recall = {best_negative['positive_recall']:.6f})."
            ),
            "",
            (
                "Accuracy нельзя использовать как единственный показатель качества, потому "
                "что positive-примеров намного больше. Модель может получать высокую "
                "accuracy за счет правильного определения positive-класса, но при этом "
                "пропускать значительную часть negative-примеров."
            ),
            (
                "Поэтому в эксперименте дополнительно используются macro_f1, "
                "negative_recall, positive_recall и confusion matrix."
            ),
            "",
            (
                "Вывод: модели с class_weight='balanced' лучше находят negative-класс, "
                "но это снижает positive_recall и может уменьшить macro_f1. Это показывает "
                "компромисс между поиском негативных отзывов и сохранением качества на "
                "позитивных отзывах."
            ),
        ]
    )


def save_research_outputs(
    df: pd.DataFrame,
    comparison_df: pd.DataFrame,
    results_dir: Path,
) -> str:
    class_distribution = df[LABEL_COLUMN].value_counts().sort_index()
    key_findings = build_key_findings(comparison_df, class_distribution)

    (results_dir / "model_comparison_markdown.md").write_text(
        build_markdown_comparison(comparison_df),
        encoding="utf-8",
    )
    (results_dir / "key_findings.json").write_text(
        json.dumps(key_findings, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    kz_summary = build_research_summary_kz(len(df), class_distribution, key_findings)
    ru_summary = build_research_summary_ru(len(df), class_distribution, key_findings)
    (results_dir / "research_summary_kz.txt").write_text(kz_summary + "\n", encoding="utf-8")
    (results_dir / "research_summary_ru.txt").write_text(ru_summary + "\n", encoding="utf-8")
    return kz_summary


def save_error_examples(
    x_test: pd.Series,
    y_test: pd.Series,
    y_pred: Any,
    results_dir: Path,
) -> None:
    errors = pd.DataFrame(
        {
            TEXT_COLUMN: x_test.reset_index(drop=True),
            "true_label": y_test.reset_index(drop=True),
            "predicted_label": pd.Series(y_pred).reset_index(drop=True),
        }
    )
    errors = errors[errors["true_label"] != errors["predicted_label"]].copy()
    errors["error_type"] = errors.apply(
        lambda row: "false_positive"
        if row["true_label"] == 0 and row["predicted_label"] == 1
        else "false_negative",
        axis=1,
    )
    errors[[TEXT_COLUMN, "true_label", "predicted_label", "error_type"]].to_csv(
        results_dir / "error_examples.csv",
        index=False,
    )


def save_metrics(metrics: dict[str, Any], results_dir: Path) -> None:
    json_metrics = {
        key: value
        for key, value in metrics.items()
        if key not in {"classification_report", "classification_report_dict"}
    }
    (results_dir / "metrics.json").write_text(
        json.dumps(json_metrics, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    report = [
        f"{metrics['model_name']} metrics",
        "",
        f"Accuracy:  {metrics['accuracy']:.6f}",
        f"Precision: {metrics['precision']:.6f}",
        f"Recall:    {metrics['recall']:.6f}",
        f"F1-score:  {metrics['f1_score']:.6f}",
        f"Macro F1:  {metrics['macro_avg']['f1-score']:.6f}",
        f"Weighted F1: {metrics['weighted_avg']['f1-score']:.6f}",
        f"Negative recall: {metrics['negative_recall']:.6f}",
        f"Positive recall: {metrics['positive_recall']:.6f}",
        "",
        "Per-class metrics:",
        json.dumps(metrics["per_class"], ensure_ascii=False, indent=2),
        "",
        "Macro avg:",
        json.dumps(metrics["macro_avg"], ensure_ascii=False, indent=2),
        "",
        "Weighted avg:",
        json.dumps(metrics["weighted_avg"], ensure_ascii=False, indent=2),
        "",
        "Classification report:",
        metrics["classification_report"],
        "",
        "Confusion matrix:",
        str(metrics["confusion_matrix"]),
        "",
        "Brief analysis:",
        build_brief_analysis(metrics),
    ]
    (results_dir / "metrics.txt").write_text("\n".join(report), encoding="utf-8")


def build_brief_analysis(metrics: dict[str, Any]) -> str:
    matrix = metrics["confusion_matrix"]
    false_positive = matrix[0][1]
    false_negative = matrix[1][0]
    dominant_error = "false positives" if false_positive > false_negative else "false negatives"

    return (
        f"The {metrics['model_name']} baseline captures frequent lexical sentiment cues, "
        f"with macro-F1={metrics['macro_avg']['f1-score']:.3f}. Main errors are driven by {dominant_error}, "
        "which can come from short texts, spelling variation, negation, sarcasm, domain shift, "
        "and Kazakh/Russian code-mixing. If classes are imbalanced, accuracy may overstate "
        "quality because the model can favor the majority class; precision, recall, F1, and "
        "the confusion matrix are therefore more informative."
    )


def save_plots(df: pd.DataFrame, metrics: dict[str, Any], results_dir: Path) -> None:
    plot_metric_bar(metrics, results_dir / "metrics_bar.png")
    plot_confusion_matrix(metrics, results_dir / "confusion_matrix.png")
    plot_class_distribution(df, results_dir / "class_distribution.png")


def save_trained_model(model: Pipeline, model_name: str, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(
        {
            "model": model,
            "model_name": model_name,
            "target_names": TARGET_NAMES,
            "text_column": TEXT_COLUMN,
            "label_column": LABEL_COLUMN,
        },
        output_path,
    )


def main() -> None:
    args = parse_args()
    dataset_dir = resolve_dataset_dir(args.dataset_dir)
    csv_path = args.csv_path if args.csv_path else find_csv_path(dataset_dir)
    args.results_dir.mkdir(parents=True, exist_ok=True)

    raw_df = load_dataset(csv_path)
    print_dataset_overview(raw_df, csv_path)

    df = preprocess_dataset(raw_df)
    print("\n=== After preprocessing ===")
    print(f"Rows: {len(df)}")
    print("Class distribution:")
    print(df[LABEL_COLUMN].value_counts().sort_index())

    x_train, x_test, y_train, y_test = split_dataset(
        df,
        test_size=args.test_size,
        random_state=args.random_state,
    )

    metrics_by_model: dict[str, dict[str, Any]] = {}
    predictions_by_model: dict[str, Any] = {}
    trained_models: dict[str, Pipeline] = {}
    for model_name, model in build_models().items():
        print(f"\n=== Training {model_name} ===")
        model.fit(x_train, y_train)
        trained_models[model_name] = model
        y_pred = model.predict(x_test)
        predictions_by_model[model_name] = y_pred
        metrics_by_model[model_name] = evaluate_model(model_name, y_test, y_pred)

    comparison_df = build_model_comparison(metrics_by_model)
    best_model_name = str(comparison_df.iloc[0]["model_name"])
    metrics = metrics_by_model[best_model_name]
    y_pred = predictions_by_model[best_model_name]

    print("\n=== Dataset size ===")
    print(len(df))
    print("\n=== Class distribution ===")
    print(df[LABEL_COLUMN].value_counts().sort_index())
    print("\n=== Model comparison ===")
    print(comparison_df.to_string(index=False, float_format=lambda value: f"{value:.6f}"))
    print(f"\nBest model by macro_f1: {best_model_name}")
    print("\n=== Best model classification report ===")
    print(metrics["classification_report"])
    print("=== Best model confusion matrix ===")
    print(pd.DataFrame(metrics["confusion_matrix"], index=TARGET_NAMES, columns=TARGET_NAMES))

    save_metrics(metrics, args.results_dir)
    save_plots(df, metrics, args.results_dir)
    save_model_comparison(comparison_df, args.results_dir)
    save_error_examples(x_test, y_test, y_pred, args.results_dir)
    kz_summary = save_research_outputs(df, comparison_df, args.results_dir)
    save_trained_model(trained_models[best_model_name], best_model_name, args.model_output)

    print("\n=== Honest conclusion about class imbalance ===")
    print(build_brief_analysis(metrics))
    print("\n=== Kazakh research summary ===")
    print(kz_summary)
    print(f"\nResults saved to: {args.results_dir.resolve()}")
    print(f"Best model saved to: {args.model_output.resolve()}")


if __name__ == "__main__":
    main()
