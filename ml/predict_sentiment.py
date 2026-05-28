"""Predict sentiment for Kazakh review text from the terminal."""

from __future__ import annotations

import argparse
import sys
import zipfile
from pathlib import Path
from typing import Any

import joblib

from kazakh_sentiment_pipeline import (
    TARGET_NAMES,
    build_models,
    find_csv_path,
    load_dataset,
    preprocess_dataset,
    resolve_dataset_dir,
    save_trained_model,
)


DEFAULT_MODEL_PATH = Path("results/sentiment_model.joblib")
DEFAULT_DATASET_ZIP = Path("code/dataset/kazsandra_dataset.zip")
DEFAULT_DATASET_DIR = Path("code/dataset/dataset")
DEFAULT_MODEL_NAME = "tfidf_multinomial_nb"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Predict positive/negative sentiment for a Kazakh review."
    )
    parser.add_argument(
        "text",
        nargs="*",
        help="Review text. If omitted, interactive input mode is started.",
    )
    parser.add_argument(
        "--model-path",
        type=Path,
        default=DEFAULT_MODEL_PATH,
        help="Path to a saved joblib model.",
    )
    parser.add_argument(
        "--dataset-dir",
        type=Path,
        default=DEFAULT_DATASET_DIR,
        help="Dataset directory used to train a model if no saved model exists.",
    )
    parser.add_argument(
        "--dataset-zip",
        type=Path,
        default=DEFAULT_DATASET_ZIP,
        help="Dataset zip archive used for auto-extraction if dataset-dir is missing.",
    )
    parser.add_argument(
        "--model-name",
        default=DEFAULT_MODEL_NAME,
        choices=sorted(build_models().keys()),
        help="Model to train when no saved model exists.",
    )
    return parser.parse_args()


def ensure_dataset(dataset_dir: Path, dataset_zip: Path) -> Path:
    if dataset_dir.exists():
        return dataset_dir

    if dataset_zip.exists():
        dataset_dir.parent.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(dataset_zip) as archive:
            archive.extractall(dataset_dir.parent)

    return resolve_dataset_dir(dataset_dir)


def train_model(
    model_name: str,
    dataset_dir: Path,
    dataset_zip: Path,
    model_path: Path,
) -> dict[str, Any]:
    dataset_dir = ensure_dataset(dataset_dir, dataset_zip)
    csv_path = find_csv_path(dataset_dir)
    df = preprocess_dataset(load_dataset(csv_path))

    model = build_models()[model_name]
    model.fit(df["text_cleaned"], df["label"])
    save_trained_model(model, model_name, model_path)

    return {
        "model": model,
        "model_name": model_name,
        "target_names": TARGET_NAMES,
    }


def load_or_train_model(args: argparse.Namespace) -> dict[str, Any]:
    if args.model_path.exists():
        return joblib.load(args.model_path)

    print(
        f"Saved model not found at {args.model_path}. Training {args.model_name} once...",
        file=sys.stderr,
    )
    return train_model(args.model_name, args.dataset_dir, args.dataset_zip, args.model_path)


def predict_text(model_bundle: dict[str, Any], text: str) -> tuple[str, int]:
    model = model_bundle["model"]
    prediction = int(model.predict([text])[0])
    target_names = model_bundle.get("target_names", TARGET_NAMES)
    return target_names[prediction], prediction


def print_prediction(model_bundle: dict[str, Any], text: str) -> None:
    label, label_id = predict_text(model_bundle, text)
    print(f"{label} ({label_id})")


def run_interactive(model_bundle: dict[str, Any]) -> None:
    print("Type a Kazakh review and press Enter. Empty input exits.")
    while True:
        try:
            text = input("> ").strip()
        except EOFError:
            print()
            break

        if not text:
            break

        print_prediction(model_bundle, text)


def main() -> None:
    args = parse_args()
    model_bundle = load_or_train_model(args)

    text = " ".join(args.text).strip()
    if text:
        print_prediction(model_bundle, text)
        return

    run_interactive(model_bundle)


if __name__ == "__main__":
    main()
