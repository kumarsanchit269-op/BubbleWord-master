from app.models.report import ReadingReport
from app.utils.text_utils import (
    calculate_accuracy,
    calculate_wpm,
)


class ReportService:

    def generate(
        self,
        total_words: int,
        correct_words: int,
        practice_words: list[str],
        reading_time: float,
    ):

        wrong_words = len(practice_words)

        accuracy = calculate_accuracy(
            correct_words,
            total_words,
        )

        wpm = calculate_wpm(
            correct_words,
            reading_time,
        )

        if accuracy >= 95:
            appreciation = (
                "🌟 Excellent! You read almost perfectly."
            )

        elif accuracy >= 85:
            appreciation = (
                "👏 Great Job! Keep practicing."
            )

        elif accuracy >= 70:
            appreciation = (
                "🙂 Nice Work! Practice the highlighted words."
            )

        else:
            appreciation = (
                "💪 Don't give up! Practice every day."
            )

        return ReadingReport(
            accuracy=accuracy,
            total_words=total_words,
            correct_words=correct_words,
            wrong_words=wrong_words,
            reading_speed=wpm,
            practice_words=practice_words,
            appreciation=appreciation,
        )


report_service = ReportService()