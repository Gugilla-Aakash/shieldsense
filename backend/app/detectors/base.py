from abc import ABC, abstractmethod
from app.models.schemas import DetectionEvidence
from typing import Any


class BaseDetector(ABC):
    @abstractmethod
    def analyze(self, target: Any) -> DetectionEvidence:
        pass
