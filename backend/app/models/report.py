from typing import List
from pydantic import BaseModel


class ReadingReport(BaseModel):
    accuracy: float
    total_words: int
    correct_words: int
    wrong_words: int
    reading_speed: int
    practice_words: List[str]
    appreciation: str


class ReportRequest(BaseModel):
    total_words: int
    correct_words: int
    reading_time: float
    practice_words: List[str]