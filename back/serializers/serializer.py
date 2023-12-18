import json

from sqlalchemy import CursorResult


class Serializer:
    @staticmethod
    def parse_to_json(dataset: CursorResult):
        return json.dumps([dict(zip(dataset.keys(), tuple(item))) for item in dataset], default=str)

