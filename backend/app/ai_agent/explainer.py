import json
from typing import Dict


def fallback_rule_based_explanation(
    risk_score: int, risk_level: str, threat_type: str, indicators: list
) -> Dict[str, str]:
    """Generates an immediate, robust explanation if all LLMs are unreachable."""
    if risk_score <= 29:
        return {
            "explanation": "No significant security threats or deceptive indicators were detected.",
            "reasoning": "Standard heuristic checks for impersonation, suspicious scripts, and credential traps completed with clean results.",
        }

    ind_names = [i.label for i in indicators]
    summary = f"ShieldSense detected suspicious patterns matching {threat_type.replace('_', ' ').title()}."
    details = f"Flagged indicators include: {', '.join(ind_names)}. Users should exercise caution and avoid submitting sensitive data or running untrusted attachments."

    return {"explanation": summary, "reasoning": details}
