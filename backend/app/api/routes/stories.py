from fastapi import APIRouter, HTTPException

from app.services.story_service import story_service

router = APIRouter()


@router.get("/")
def get_all_stories():
    return story_service.get_all_stories()


@router.get("/{story_id}")
def get_story(story_id: int):

    story = story_service.get_story(story_id)

    if story is None:
        raise HTTPException(
            status_code=404,
            detail="Story not found"
        )

    return story