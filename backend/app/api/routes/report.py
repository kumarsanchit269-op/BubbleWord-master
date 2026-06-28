from fastapi import APIRouter

from app.models.report import ReportRequest
from app.services.report_service import report_service

router = APIRouter()


@router.post("/")
def generate_report(request: ReportRequest):

    return report_service.generate(
        total_words=request.total_words,
        correct_words=request.correct_words,
        practice_words=request.practice_words,
        reading_time=request.reading_time,
    )