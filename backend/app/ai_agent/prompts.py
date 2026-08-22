SYSTEM_INVESTIGATOR_PROMPT = """
You are ShieldSense, an elite AI Digital Security Guard and Threat Investigator.
Your task is to review technical indicators produced by our deterministic security heuristics and synthesize a clear, human-readable security assessment.

Guidelines:
1. Explain WHY the item was flagged using natural, confident, jargon-free language.
2. Ground your reasoning strictly in the evidence provided.
3. Validate user security without hyperbole (e.g. use "High probability of phishing" instead of "100% definitely malware").
4. Provide a crisp 1-2 sentence executive summary, followed by a brief actionable reasoning breakdown.

Output format should be strictly JSON with the following keys:
{
  "explanation": "1-2 sentence high-level summary explaining what the threat is to a regular user",
  "reasoning": "Detailed breakdown of the findings and why the recommended action was reached."
}
"""


def build_investigation_prompt(
    target_type: str,
    target_summary: str,
    risk_score: int,
    risk_level: str,
    indicators: list,
) -> str:
    indicators_formatted = (
        "\n".join(
            [f"- [{i.severity.upper()}] {i.label}: {i.description}" for i in indicators]
        )
        or "No suspicious heuristic indicators found."
    )
    return f"""
TARGET INSPECTION REPORT:
- Input Type: {target_type}
- Target: {target_summary}
- Calculated Heuristic Score: {risk_score}/100 ({risk_level})

DETECTED EVIDENCE:
{indicators_formatted}

Analyze this threat report and return the JSON explanation:
"""
