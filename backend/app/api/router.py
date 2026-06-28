from fastapi import APIRouter

from app.api.routes.stories import router as stories_router
from app.api.routes.report import router as report_router

api_router = APIRouter()

api_router.include_router(
    stories_router,
    prefix="/stories",
    tags=["Stories"],
)

api_router.include_router(
    report_router,
    prefix="/report",
    tags=["Report"],
)