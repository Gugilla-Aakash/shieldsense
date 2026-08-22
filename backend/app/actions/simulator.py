from datetime import datetime, timezone
from app.models.schemas import RecommendedAction, ActionSimulateResponse


class ActionSimulator:
    @staticmethod
    def execute_simulation(
        scan_id: str, action: RecommendedAction, notes: str = None
    ) -> ActionSimulateResponse:
        messages = {
            RecommendedAction.BLOCK: "Item blocked. Communication channels and connection attempts to this destination have been neutralized.",
            RecommendedAction.WARN: "Security warning applied. User confirmation will be required before any interaction.",
            RecommendedAction.QUARANTINE: "Item isolated in a sandboxed quarantine container for offline inspection.",
            RecommendedAction.ALLOW: "Item marked as safe and allowed to proceed.",
        }

        return ActionSimulateResponse(
            scan_id=scan_id,
            action_applied=action,
            status="SUCCESS",
            message=messages.get(action, "Simulated security action executed."),
            timestamp=datetime.now(timezone.utc),
        )
