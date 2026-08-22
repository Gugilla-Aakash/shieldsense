import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.schemas import (
    ScanURLRequest,
    ScanTextRequest,
    ScanResultResponse,
    InputType,
)
from app.detectors.url_detector import URLDetector
from app.detectors.email_detector import EmailDetector
from app.detectors.file_detector import FileDetector
from app.scoring.risk_engine import RiskEngine
from app.ai_agent.agent import SecurityAIAgent
from app.db.repository import ScanRepository

router = APIRouter()

url_detector = URLDetector()
email_detector = EmailDetector()
file_detector = FileDetector()


@router.post("/url", response_model=ScanResultResponse)
def scan_url(payload: ScanURLRequest, db: Session = Depends(get_db)):
    scan_id = str(uuid.uuid4())
    evidence = url_detector.analyze(payload.url)
    score, level, threat_type, action = RiskEngine.evaluate(evidence.indicators)
    explanation, reasoning, model_used = SecurityAIAgent.investigate(
        "URL", payload.url, score, level.value, threat_type.value, evidence.indicators
    )

    result = ScanResultResponse(
        scan_id=scan_id,
        timestamp=datetime.now(timezone.utc),
        input_type=InputType.URL,
        target_summary=payload.url,
        risk_score=score,
        risk_level=level,
        threat_type=threat_type,
        indicators=evidence.indicators,
        recommendation=action,
        explanation=explanation,
        ai_agent_reasoning=reasoning,
        model_used=model_used,
    )

    ScanRepository(db).save_scan(result, raw_payload=payload.url)
    return result


@router.post("/text", response_model=ScanResultResponse)
def scan_text(payload: ScanTextRequest, db: Session = Depends(get_db)):
    scan_id = str(uuid.uuid4())
    evidence = email_detector.analyze(payload.model_dump())
    score, level, threat_type, action = RiskEngine.evaluate(evidence.indicators)

    summary = payload.subject or (
        payload.content[:60] + "..." if len(payload.content) > 60 else payload.content
    )
    explanation, reasoning, model_used = SecurityAIAgent.investigate(
        "Email / Text Message",
        summary,
        score,
        level.value,
        threat_type.value,
        evidence.indicators,
    )

    result = ScanResultResponse(
        scan_id=scan_id,
        timestamp=datetime.now(timezone.utc),
        input_type=InputType.EMAIL,
        target_summary=summary,
        risk_score=score,
        risk_level=level,
        threat_type=threat_type,
        indicators=evidence.indicators,
        recommendation=action,
        explanation=explanation,
        ai_agent_reasoning=reasoning,
        model_used=model_used,
    )

    ScanRepository(db).save_scan(result, raw_payload=payload.content)
    return result


@router.post("/file", response_model=ScanResultResponse)
async def scan_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    scan_id = str(uuid.uuid4())
    contents = await file.read()
    file_size = len(contents)

    evidence = file_detector.analyze(
        {
            "filename": file.filename,
            "file_size_bytes": file_size,
            "mime_type": file.content_type,
        }
    )

    score, level, threat_type, action = RiskEngine.evaluate(evidence.indicators)
    explanation, reasoning, model_used = SecurityAIAgent.investigate(
        "File",
        file.filename,
        score,
        level.value,
        threat_type.value,
        evidence.indicators,
    )

    result = ScanResultResponse(
        scan_id=scan_id,
        timestamp=datetime.now(timezone.utc),
        input_type=InputType.FILE,
        target_summary=file.filename,
        risk_score=score,
        risk_level=level,
        threat_type=threat_type,
        indicators=evidence.indicators,
        recommendation=action,
        explanation=explanation,
        ai_agent_reasoning=reasoning,
        model_used=model_used,
    )

    ScanRepository(db).save_scan(
        result, raw_payload=f"Filename: {file.filename}, Size: {file_size} bytes"
    )
    return result
