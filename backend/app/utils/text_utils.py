import re


def normalize_text(text: str) -> str:
    """
    Lowercase text and remove punctuation.
    """
    text = text.lower()

    text = re.sub(r"[^\w\s]", "", text)

    text = re.sub(r"\s+", " ", text)

    return text.strip()


def tokenize(text: str) -> list[str]:
    """
    Convert sentence into normalized word list.
    """
    return normalize_text(text).split()


def count_words(text: str) -> int:
    return len(tokenize(text))


def calculate_accuracy(correct: int, total: int) -> float:
    if total == 0:
        return 0

    return round((correct / total) * 100, 2)


def calculate_wpm(words: int, seconds: float) -> int:
    if seconds <= 0:
        return 0

    minutes = seconds / 60

    return int(words / minutes)