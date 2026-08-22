import re
import ipaddress
import tldextract
from urllib.parse import urlparse
from app.detectors.base import BaseDetector
from app.models.schemas import DetectionEvidence, Indicator
from app.detectors.keyword_lists import (
    POPULAR_TARGET_BRANDS,
    SUSPICIOUS_URL_KEYWORDS,
    URL_SHORTENERS,
)


class URLDetector(BaseDetector):
    def _sanitize_url(self, raw_url: str) -> str:
        # Strip markdown syntax like [url](url), spaces, quotes, brackets
        cleaned = re.sub(r"\[(.*?)\]\((.*?)\)", r"\2", raw_url.strip())
        cleaned = cleaned.strip("[]()\"' ")
        if not re.match(r"^[a-zA-Z]+://", cleaned):
            cleaned = "http://" + cleaned
        return cleaned

    def analyze(self, raw_url: str) -> DetectionEvidence:
        url = self._sanitize_url(raw_url)
        evidence = DetectionEvidence()

        parsed = urlparse(url)
        domain = (parsed.netloc or "").lower().split(":")[0]
        path = (parsed.path or "").lower()
        full_url_lower = url.lower()

        extracted = tldextract.extract(url)
        registered_domain = f"{extracted.domain}.{extracted.suffix}".lower()
        subdomain_str = extracted.subdomain.lower()
        subdomains = subdomain_str.split(".") if subdomain_str else []

        # 1. Non-HTTPS Check
        if parsed.scheme == "http":
            evidence.indicators.append(
                Indicator(
                    code="INSECURE_HTTP",
                    label="Unencrypted HTTP Connection",
                    description="The URL uses unencrypted HTTP instead of HTTPS.",
                    weight=15,
                    severity="low",
                )
            )

        # 2. Raw IP address as host
        try:
            ipaddress.ip_address(domain)
            evidence.indicators.append(
                Indicator(
                    code="IP_AS_HOST",
                    label="IP Address Used As Hostname",
                    description="The destination directly uses an IP address instead of a domain name.",
                    weight=30,
                    severity="high",
                )
            )
        except ValueError:
            pass

        # 3. Lookalike / Typosquatting / Brand Impersonation
        for brand in POPULAR_TARGET_BRANDS:
            # Common typosquat patterns (0 for o, 1 for l/i, etc.)
            typo_variations = [
                brand.replace("l", "1"),
                brand.replace("o", "0"),
                brand.replace("i", "1"),
                brand.replace("e", "3"),
                brand.replace("a", "4"),
                brand.replace("s", "5"),
            ]

            # Check for character substitution lookalikes (e.g., paypa1, g00gle)
            is_typosquat = any(
                tv in domain and brand not in domain
                for tv in typo_variations
                if tv != brand
            )
            if is_typosquat:
                evidence.indicators.append(
                    Indicator(
                        code="TYPOSQUAT_LOOKALIKE",
                        label=f"Lookalike Domain Detected ({brand.capitalize()})",
                        description=f"Domain '{domain}' uses character substitution to visually imitate '{brand}'.",
                        weight=45,
                        severity="critical",
                    )
                )
                break

            # Brand in subdomain or secondary segment while registered domain differs
            if brand in domain and brand != extracted.domain:
                evidence.indicators.append(
                    Indicator(
                        code="BRAND_IMPERSONATION_SUBDOMAIN",
                        label=f"Potential Brand Impersonation ({brand.capitalize()})",
                        description=f"Domain structure contains '{brand}', but belongs to '{registered_domain}'.",
                        weight=40,
                        severity="critical",
                    )
                )
                break

        # 4. Phishing / Security Keywords in Path or Subdomain
        found_kw = [kw for kw in SUSPICIOUS_URL_KEYWORDS if kw in full_url_lower]
        if found_kw:
            weight = min(len(found_kw) * 10, 30)
            evidence.indicators.append(
                Indicator(
                    code="SUSPICIOUS_KEYWORDS_URL",
                    label="Authentication / Sensitive Keywords",
                    description=f"URL contains sensitive credential keywords: {', '.join(found_kw[:4])}",
                    weight=weight,
                    severity="high" if len(found_kw) >= 2 else "medium",
                )
            )

        # 5. Excessive Subdomains
        if len(subdomains) >= 3:
            evidence.indicators.append(
                Indicator(
                    code="EXCESSIVE_SUBDOMAINS",
                    label="Excessive Subdomain Nesting",
                    description="Unusually deep subdomain nesting often used to disguise destinations.",
                    weight=20,
                    severity="medium",
                )
            )

        # 6. URL Shortener
        if domain in URL_SHORTENERS or registered_domain in URL_SHORTENERS:
            evidence.indicators.append(
                Indicator(
                    code="URL_SHORTENER",
                    label="Known URL Shortener",
                    description="Shortened URL obfuscates the true final destination.",
                    weight=20,
                    severity="medium",
                )
            )

        evidence.raw_extracted_features = {
            "sanitized_url": url,
            "domain": domain,
            "registered_domain": registered_domain,
            "subdomains": subdomains,
            "path": path,
            "scheme": parsed.scheme,
            "length": len(url),
        }

        return evidence
