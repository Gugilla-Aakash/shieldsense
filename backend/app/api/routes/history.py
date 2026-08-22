from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.schemas import ScanHistoryItem
from app.db.repository import ScanRepository

router = APIRouter()


@router.get("/", response_model=List[ScanHistoryItem])
def get_scan_history(limit: int = 50, db: Session = Depends(get_db)):
    repo = ScanRepository(db)
    return repo.list_history(limit=limit)
