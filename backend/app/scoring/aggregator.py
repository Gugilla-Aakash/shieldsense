from typing import List
from app.models.schemas import Indicator
from app.scoring.weights_config import CATEGORY_WEIGHT_MULTIPLIERS


class EvidenceAggregator:
    @staticmethod
    def calculate_total_weight(indicators: List[Indicator]) -> int:
        if not indicators:
            return 0
        raw_score = 0.0
        for ind in indicators:
            multiplier = CATEGORY_WEIGHT_MULTIPLIERS.get(ind.severity.lower(), 1.0)
            raw_score += ind.weight * multiplier

        # Hard clamp between 0 and 100
        return min(max(int(raw_score), 0), 100)
