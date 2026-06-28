import json
from pathlib import Path

from app.models.story import Story
from app.utils.text_utils import count_words


class StoryService:

    def __init__(self):
        self.story_path = (
            Path(__file__).resolve().parent.parent / "stories"
        )

        self.stories = self._load_stories()

    def _load_stories(self):

        stories = []

        for file in sorted(self.story_path.glob("*.json")):

            with open(file, "r", encoding="utf-8") as f:

                data = json.load(f)

                if isinstance(data, list):

                    for item in data:

                        item["word_count"] = count_words(
                            item["paragraph"]
                        )

                        stories.append(Story(**item))

                else:

                    data["word_count"] = count_words(
                        data["paragraph"]
                    )

                    stories.append(Story(**data))

        return stories

    def get_all_stories(self):

        return self.stories

    def get_story(self, story_id: int):

        for story in self.stories:

            if story.id == story_id:

                return story

        return None


story_service = StoryService()