from enum import Enum


class Precision(Enum):
    Precise = 1
    Interval = 2
    Limit = 3


class Classifier:
    @staticmethod
    def precise_classified(value: list):
        if len(value) == 1:
            return Precision.Precise

        if value[0] == 0 or value[1] == 0:
            return Precision.Limit

        return Precision.Interval
