from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router

app = FastAPI(
    title="BubbleWord API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://bubble-wordv1.vercel.app",
        "https://bubble-wordv1-jm9bvqskm-kumarsanchit269-8153s-projects.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "BubbleWord Backend Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
