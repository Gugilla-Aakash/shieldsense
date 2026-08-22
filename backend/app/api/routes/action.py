from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.schemas import ActionSimulateRequest, ActionSimulateResponse
from app.actions.simulator import ActionSimulator
from app.db.repository import ScanRepository

router = APIRouter()


@router.post("/simulate", response_model=ActionSimulateResponse)
def simulate_action(payload: ActionSimulateRequest, db: Session = Depends(get_db)):
    repo = ScanRepository(db)
    record = repo.get_by_id(payload.scan_id)
    if not record:
        raise HTTPException(status_code=404, detail="Scan record not found")

    response = ActionSimulator.execute_simulation(
        scan_id=payload.scan_id, action=payload.action, notes=payload.notes
    )

    repo.update_action(payload.scan_id, payload.action.value)
    return response
