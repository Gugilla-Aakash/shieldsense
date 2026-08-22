from abc import ABC, abstractmethod
from app.models.schemas import DetectionEvidence


class BaseDetector(ABC):
    @abstractmethod
    def analyze(self, target: Any) -> DetectionEvidence:
        pass
