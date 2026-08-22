from sqlalchemy import Column, String, Integer, DateTime, Text
from datetime import datetime, timezone
from app.db.session import Base


class ScanRecord(Base):
    __tablename__ = "scan_records"

    scan_id = Column(String(64), primary_key=True, index=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    input_type = Column(String(32), index=True)
    target_summary = Column(String(512))
    raw_payload = Column(Text)
    risk_score = Column(Integer)
    risk_level = Column(String(32))
    threat_type = Column(String(64))
    indicators_json = Column(Text)
    recommendation = Column(String(32))
    explanation = Column(Text)
    ai_reasoning = Column(Text)
    model_used = Column(String(64))
    action_taken = Column(String(64), nullable=True)
