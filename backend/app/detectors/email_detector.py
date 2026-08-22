import re
from app.detectors.base import BaseDetector
from app.models.schemas import DetectionEvidence, Indicator
from app.detectors.keyword_lists import (
    URGENCY_KEYWORDS,
    CREDENTIAL_HARVEST_KEYWORDS,
    POPULAR_TARGET_BRANDS,
)


class EmailDetector(BaseDetector):
    def analyze(self, payload: dict) -> DetectionEvidence:
        content = payload.get("content", "")
        sender = payload.get("sender", "") or ""
        subject = payload.get("subject", "") or ""
        text_corpus = f"{subject} {content}".lower()

        evidence = DetectionEvidence()

        # 1. Urgency / Threat of Account Suspension
        found_urgency = [kw for kw in URGENCY_KEYWORDS if kw in text_corpus]
        if found_urgency:
            evidence.indicators.append(
                Indicator(
                    code="URGENCY_PSYCHOLOGICAL_PRESSURE",
                    label="High Urgency / Pressure Tactics",
                    description=f"Language exhibits urgency triggers: {', '.join(found_urgency[:3])}",
                    weight=25,
                    severity="high",
                )
            )

        # 2. Credential / Financial Extraction Requests
        found_cred = [kw for kw in CREDENTIAL_HARVEST_KEYWORDS if kw in text_corpus]
        if found_cred:
            evidence.indicators.append(
                Indicator(
                    code="CREDENTIAL_HARVESTING_LANGUAGE",
                    label="Explicit Credential Request",
                    description=f"Message explicitly requests sensitive personal or account information: {', '.join(found_cred[:2])}",
                    weight=35,
                    severity="critical",
                )
            )

        # 3. Brand Impersonation Mismatch
        for brand in POPULAR_TARGET_BRANDS:
            if brand in text_corpus:
                if sender and brand not in sender.lower():
                    evidence.indicators.append(
                        Indicator(
                            code="SENDER_BRAND_MISMATCH",
                            label=f"Sender Domain Mismatch ({brand.capitalize()})",
                            description=f"Message claims to be or mentions '{brand}', but sender email '{sender}' is not official.",
                            weight=35,
                            severity="critical",
                        )
                    )
                    break

        # 4. Links embedded within email body
        urls_found = re.findall(r'https?://[^\s<>"]+|www\.[^\s<>"]+', content)
        if urls_found:
            evidence.indicators.append(
                Indicator(
                    code="EMBEDDED_LINKS_DETECTED",
                    label="Embedded URLs Present",
                    description=f"Detected {len(urls_found)} link(s) inside the text content.",
                    weight=10,
                    severity="low",
                )
            )

        evidence.raw_extracted_features = {
            "content_length": len(content),
            "embedded_urls_count": len(urls_found),
            "urgency_matches": found_urgency,
            "credential_matches": found_cred,
        }

        return evidence
