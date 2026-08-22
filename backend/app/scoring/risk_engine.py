from typing import List, Tuple
from app.models.schemas import Indicator, RiskLevel, ThreatType, RecommendedAction
from app.scoring.aggregator import EvidenceAggregator
from app.core.config import settings


class RiskEngine:
    @staticmethod
    def evaluate(
        indicators: List[Indicator],
    ) -> Tuple[int, RiskLevel, ThreatType, RecommendedAction]:
        score = EvidenceAggregator.calculate_total_weight(indicators)

        # Determine Risk Level
        if score <= settings.RISK_SAFE_MAX:
            level = RiskLevel.SAFE
            action = RecommendedAction.ALLOW
        elif score <= settings.RISK_SUSPICIOUS_MAX:
            level = RiskLevel.SUSPICIOUS
            action = RecommendedAction.WARN
        else:
            level = RiskLevel.DANGEROUS
            action = RecommendedAction.BLOCK

        # Infer Primary Threat Type from Evidence
        indicator_codes = [i.code for i in indicators]
        if any("BRAND" in c or "TYPOSQUAT" in c for c in indicator_codes):
            threat = ThreatType.BRAND_IMPERSONATION
        elif any("CREDENTIAL" in c or "PHISHING" in c for c in indicator_codes):
            threat = ThreatType.PHISHING
        elif any("EXTENSION" in c or "MALWARE" in c for c in indicator_codes):
            threat = ThreatType.MALWARE_DROPPER
        elif score > 30:
            threat = ThreatType.SUSPICIOUS_CONTENT
        else:
            threat = ThreatType.CLEAN

        return score, level, threat, action
