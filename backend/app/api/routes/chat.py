from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.schemas import AIChatRequest, AIChatResponse
from app.ai_agent.agent import SecurityAIAgent
from app.db.repository import ScanRepository

router = APIRouter()


@router.post("/", response_model=AIChatResponse)
def ask_security_agent(payload: AIChatRequest, db: Session = Depends(get_db)):
    context_str = None

    # If the user is asking about a specific scan, attach its investigation context
    if payload.scan_id:
        record = ScanRepository(db).get_by_id(payload.scan_id)
        if record:
            context_str = (
                f"Target: {record.target_summary}\n"
                f"Type: {record.input_type}\n"
                f"Risk Score: {record.risk_score}/100 ({record.risk_level})\n"
                f"Threat Classification: {record.threat_type}\n"
                f"Evidence: {record.indicators_json}\n"
                f"Previous Explanation: {record.explanation}"
            )

    reply, model_used = SecurityAIAgent.chat(
        message=payload.message, context_summary=context_str, history=payload.history
    )

    return AIChatResponse(
        reply=reply,
        model_used=model_used,
        suggested_actions=[
            "What should I do?",
            "Why was this flagged?",
            "Is it safe to open?",
        ],
    )
