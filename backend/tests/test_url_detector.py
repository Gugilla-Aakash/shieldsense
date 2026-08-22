from app.detectors.url_detector import URLDetector
from app.scoring.risk_engine import RiskEngine


def test_safe_url():
    detector = URLDetector()
    evidence = detector.analyze("https://example.com")
    score, level, _, action = RiskEngine.evaluate(evidence.indicators)
    assert score < 30
    assert level.value == "SAFE"


def test_phishing_lookalike_url():
    detector = URLDetector()
    evidence = detector.analyze("http://paypa1-secure-verification.com/login")
    score, level, threat_type, action = RiskEngine.evaluate(evidence.indicators)
    assert score >= 60
    assert level.value == "DANGEROUS"
    assert action.value == "BLOCK"
