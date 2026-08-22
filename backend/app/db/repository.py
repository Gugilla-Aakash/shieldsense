import json
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.db_models import ScanRecord
from app.models.schemas import (
    ScanResultResponse,
    ScanHistoryItem,
    InputType,
    RiskLevel,
    ThreatType,
    RecommendedAction,
)


class ScanRepository:
    def __init__(self, db: Session):
        self.db = db

    def save_scan(self, scan_res: ScanResultResponse, raw_payload: str) -> ScanRecord:
        record = ScanRecord(
            scan_id=scan_res.scan_id,
            timestamp=scan_res.timestamp,
            input_type=scan_res.input_type.value,
            target_summary=scan_res.target_summary,
            raw_payload=raw_payload,
            risk_score=scan_res.risk_score,
            risk_level=scan_res.risk_level.value,
            threat_type=scan_res.threat_type.value,
            indicators_json=json.dumps([i.model_dump() for i in scan_res.indicators]),
            recommendation=scan_res.recommendation.value,
            explanation=scan_res.explanation,
            ai_reasoning=scan_res.ai_agent_reasoning,
            model_used=scan_res.model_used,
            action_taken=None,
        )
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return record

    def get_by_id(self, scan_id: str) -> Optional[ScanRecord]:
        return self.db.query(ScanRecord).filter(ScanRecord.scan_id == scan_id).first()

    def list_history(self, limit: int = 50) -> List[ScanHistoryItem]:
        records = (
            self.db.query(ScanRecord)
            .order_by(ScanRecord.timestamp.desc())
            .limit(limit)
            .all()
        )
        return [
            ScanHistoryItem(
                scan_id=r.scan_id,
                timestamp=r.timestamp,
                input_type=InputType(r.input_type),
                target_summary=r.target_summary,
                risk_score=r.risk_score,
                risk_level=RiskLevel(r.risk_level),
                threat_type=ThreatType(r.threat_type),
                recommendation=RecommendedAction(r.recommendation),
                action_taken=r.action_taken,
            )
            for r in records
        ]

    def update_action(self, scan_id: str, action: str) -> Optional[ScanRecord]:
        record = self.get_by_id(scan_id)
        if record:
            record.action_taken = action
            self.db.commit()
            self.db.refresh(record)
        return record
