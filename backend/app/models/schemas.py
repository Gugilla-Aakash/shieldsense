from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum
from datetime import datetime


class InputType(str, Enum):
    URL = "url"
    EMAIL = "email"
    FILE = "file"


class RiskLevel(str, Enum):
    SAFE = "SAFE"
    SUSPICIOUS = "SUSPICIOUS"
    DANGEROUS = "DANGEROUS"


class ThreatType(str, Enum):
    CLEAN = "CLEAN"
    PHISHING = "PHISHING"
    BRAND_IMPERSONATION = "BRAND_IMPERSONATION"
    MALWARE_DROPPER = "MALWARE_DROPPER"
    SUSPICIOUS_CONTENT = "SUSPICIOUS_CONTENT"
    SCAM = "SCAM"
    UNKNOWN = "UNKNOWN"


class RecommendedAction(str, Enum):
    ALLOW = "ALLOW"
    WARN = "WARN"
    BLOCK = "BLOCK"
    QUARANTINE = "QUARANTINE"


# Request Models
class ScanURLRequest(BaseModel):
    url: str = Field(..., description="Target URL to inspect")


class ScanTextRequest(BaseModel):
    content: str = Field(..., description="Email or text message body to inspect")
    sender: Optional[str] = Field(None, description="Sender email address if available")
    subject: Optional[str] = Field(None, description="Email subject line if available")


class ScanFileMetadataRequest(BaseModel):
    filename: str
    file_size_bytes: int
    mime_type: Optional[str] = None
    file_hash_sha256: Optional[str] = None


class ActionSimulateRequest(BaseModel):
    scan_id: str
    action: RecommendedAction
    notes: Optional[str] = None


# Response Models
class Indicator(BaseModel):
    code: str
    label: str
    description: str
    weight: int
    severity: str  # low, medium, high, critical


class DetectionEvidence(BaseModel):
    indicators: List[Indicator] = []
    raw_extracted_features: Dict[str, Any] = {}


class ScanResultResponse(BaseModel):
    scan_id: str
    timestamp: datetime
    input_type: InputType
    target_summary: str
    risk_score: int
    risk_level: RiskLevel
    threat_type: ThreatType
    indicators: List[Indicator]
    recommendation: RecommendedAction
    explanation: str
    ai_agent_reasoning: str
    model_used: str


class ScanHistoryItem(BaseModel):
    scan_id: str
    timestamp: datetime
    input_type: InputType
    target_summary: str
    risk_score: int
    risk_level: RiskLevel
    threat_type: ThreatType
    recommendation: RecommendedAction
    action_taken: Optional[str] = None


class ActionSimulateResponse(BaseModel):
    scan_id: str
    action_applied: RecommendedAction
    status: str
    message: str
    timestamp: datetime


class ChatMessage(BaseModel):
    role: str = Field(..., description="'user' or 'assistant'")
    content: str


class AIChatRequest(BaseModel):
    message: str = Field(..., description="User question or statement")
    scan_id: Optional[str] = Field(
        None,
        description="Optional scan_id to ground the chat in a specific investigation",
    )
    history: Optional[List[ChatMessage]] = Field(
        default_factory=list, description="Previous messages in the conversation"
    )


class AIChatResponse(BaseModel):
    reply: str
    model_used: str
    suggested_actions: List[str] = []
