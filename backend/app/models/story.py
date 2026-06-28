from pydantic import BaseModel


class Story(BaseModel):
    id: int
    title: str
    difficulty: str
    estimated_time: str
    word_count: int
    paragraph: str