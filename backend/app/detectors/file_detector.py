from app.detectors.base import BaseDetector
from app.models.schemas import DetectionEvidence, Indicator
from app.detectors.keyword_lists import SUSPICIOUS_EXTENSIONS, DOUBLE_EXTENSION_PATTERNS


class FileDetector(BaseDetector):
    def analyze(self, file_meta: dict) -> DetectionEvidence:
        filename = file_meta.get("filename", "").lower()
        file_size = file_meta.get("file_size_bytes", 0)

        evidence = DetectionEvidence()

        # 1. Double Extension Trick (e.g. invoice.pdf.exe)
        for pattern in DOUBLE_EXTENSION_PATTERNS:
            if filename.endswith(pattern):
                evidence.indicators.append(
                    Indicator(
                        code="DOUBLE_EXTENSION_DECEPTION",
                        label="Deceptive Double Extension",
                        description=f"Filename uses deceptive extension '{pattern}' to disguise an executable as a document.",
                        weight=50,
                        severity="critical",
                    )
                )
                break

        # 2. High-Risk Executable or Script Extension
        for ext in SUSPICIOUS_EXTENSIONS:
            if filename.endswith(ext):
                evidence.indicators.append(
                    Indicator(
                        code="DANGEROUS_FILE_EXTENSION",
                        label=f"High-Risk Executable/Script ({ext})",
                        description="File is directly executable or a macro/script capable of arbitrary code execution.",
                        weight=35,
                        severity="high",
                    )
                )
                break

        # 3. Suspicious Filename Keywords
        suspicious_names = [
            "invoice",
            "receipt",
            "payment_proof",
            "remittance",
            "tax_refund",
            "order_details",
        ]
        if any(name in filename for name in suspicious_names) and any(
            filename.endswith(ext) for ext in SUSPICIOUS_EXTENSIONS
        ):
            evidence.indicators.append(
                Indicator(
                    code="MALWARE_LURE_FILENAME",
                    label="Malware Lure Filename Pattern",
                    description="Combines financial/invoice lure terminology with an executable payload.",
                    weight=25,
                    severity="high",
                )
            )

        evidence.raw_extracted_features = {"filename": filename, "file_size": file_size}

        return evidence
