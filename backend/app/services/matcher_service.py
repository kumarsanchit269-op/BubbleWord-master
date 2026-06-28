from rapidfuzz import fuzz

from app.utils.text_utils import normalize_text


class MatcherService:

    def __init__(self, threshold: int = 80):
        self.threshold = threshold

    def compare(self, expected: str, spoken: str):

        expected = normalize_text(expected)
        spoken = normalize_text(spoken)

        score = fuzz.ratio(expected, spoken)

        return {
            "correct": score >= self.threshold,
            "score": score
        }


matcher_service = MatcherService()