# pyright: reportPrivateImportUsage=false
import json
from typing import Tuple, Dict, Optional, List
from app.core.config import settings
from app.core.logging import logger
from app.ai_agent.prompts import SYSTEM_INVESTIGATOR_PROMPT, build_investigation_prompt
from app.ai_agent.explainer import fallback_rule_based_explanation

# Optional imports handled gracefully
try:
    import google.generativeai as genai

    if settings.GEMINI_API_KEY:
        genai.configure(api_key=settings.GEMINI_API_KEY)  # type: ignore
except Exception:
    genai = None

try:
    from groq import Groq

    groq_client = Groq(api_key=settings.GROQ_API_KEY) if settings.GROQ_API_KEY else None
except Exception:
    groq_client = None


CHAT_SYSTEM_PROMPT = """
You are ShieldSense, an AI Digital Security Guardian and Personal Cybersecurity Advisor.
You help everyday users understand digital threats, phishing attempts, suspicious files, and online security.

Rules:
1. Speak in a helpful, calm, clear, and reassuring tone without unnecessary technical jargon.
2. Ground your answers in the scan context if one is provided.
3. Give clear, safe, and actionable steps (e.g., "Do not click", "Enable 2FA", "Contact your bank directly").
4. Never encourage interacting with suspicious links or downloading untrusted files.
5. Dont use markdown format, use only text
6. Answer only related to the context, strictly ignore any other questions
"""


class SecurityAIAgent:
    @staticmethod
    def _call_gemini(prompt: str) -> Dict[str, str]:
        if not genai or not settings.GEMINI_API_KEY:
            raise ValueError("Gemini API key is not configured.")

        model = genai.GenerativeModel(  # type: ignore
            model_name=settings.GEMINI_MODEL,
            generation_config={"response_mime_type": "application/json"},
        )
        response = model.generate_content([SYSTEM_INVESTIGATOR_PROMPT, prompt])
        raw_text = response.text or "{}"
        return json.loads(raw_text)

    @staticmethod
    def _call_groq(prompt: str) -> Dict[str, str]:
        if not groq_client:
            raise ValueError("Groq API key is not configured.")

        completion = groq_client.chat.completions.create(
            model=settings.GROQ_MODEL,
            response_format={"type": "json_object"},
            messages=[  # type: ignore
                {"role": "system", "content": SYSTEM_INVESTIGATOR_PROMPT},
                {"role": "user", "content": prompt},
            ],
            temperature=0.2,
        )
        content = completion.choices[0].message.content or "{}"
        return json.loads(content)

    @classmethod
    def investigate(
        cls,
        target_type: str,
        target_summary: str,
        risk_score: int,
        risk_level: str,
        threat_type: str,
        indicators: list,
    ) -> Tuple[str, str, str]:
        prompt = build_investigation_prompt(
            target_type, target_summary, risk_score, risk_level, indicators
        )

        # 1. Primary: Gemini
        try:
            logger.info("Generating AI explanation using Gemini...")
            data = cls._call_gemini(prompt)
            return (
                data.get("explanation", ""),
                data.get("reasoning", ""),
                f"Gemini ({settings.GEMINI_MODEL})",
            )
        except Exception as e:
            logger.warning(f"Primary LLM (Gemini) failed: {e}. Falling back to Groq...")

        # 2. Fallback: Groq
        try:
            data = cls._call_groq(prompt)
            return (
                data.get("explanation", ""),
                data.get("reasoning", ""),
                f"Groq ({settings.GROQ_MODEL})",
            )
        except Exception as e:
            logger.warning(
                f"Fallback LLM (Groq) failed: {e}. Using deterministic explainer..."
            )

        # 3. Final Fallback: Heuristic Rule-Based
        data = fallback_rule_based_explanation(
            risk_score, risk_level, threat_type, indicators
        )
        return data["explanation"], data["reasoning"], "Deterministic Heuristic Engine"

    @classmethod
    def chat(
        cls,
        message: str,
        context_summary: Optional[str] = None,
        history: Optional[list] = None,
    ) -> Tuple[str, str]:
        history = history or []

        system_instruction = CHAT_SYSTEM_PROMPT
        if context_summary:
            system_instruction += (
                f"\n\nCURRENT INVESTIGATION CONTEXT:\n{context_summary}"
            )

        # 1. Primary: Gemini
        try:
            if not genai or not settings.GEMINI_API_KEY:
                raise ValueError("Gemini not configured")

            gemini_messages = []
            for h in history:
                role_val = getattr(
                    h, "role", h.get("role", "user") if isinstance(h, dict) else "user"
                )
                content_val = getattr(
                    h, "content", h.get("content", "") if isinstance(h, dict) else ""
                )

                role = "user" if role_val == "user" else "model"
                gemini_messages.append({"role": role, "parts": [content_val]})

            model = genai.GenerativeModel(  # type: ignore
                model_name=settings.GEMINI_MODEL, system_instruction=system_instruction
            )
            chat_session = model.start_chat(history=gemini_messages)
            res = chat_session.send_message(message)
            return res.text or "", f"Gemini ({settings.GEMINI_MODEL})"

        except Exception as e:
            logger.warning(f"Chat failed on Gemini: {e}. Attempting Groq fallback...")

        # 2. Fallback: Groq
        try:
            if not groq_client:
                raise ValueError("Groq not configured")

            groq_msgs = [{"role": "system", "content": system_instruction}]
            for h in history:
                role_val = getattr(
                    h, "role", h.get("role", "user") if isinstance(h, dict) else "user"
                )
                content_val = getattr(
                    h, "content", h.get("content", "") if isinstance(h, dict) else ""
                )
                groq_msgs.append({"role": role_val, "content": content_val})

            groq_msgs.append({"role": "user", "content": message})

            comp = groq_client.chat.completions.create(
                model=settings.GROQ_MODEL,
                messages=groq_msgs,  # type: ignore
                temperature=0.3,
            )
            reply = comp.choices[0].message.content or ""
            return reply, f"Groq ({settings.GROQ_MODEL})"

        except Exception as e:
            logger.warning(
                f"Chat failed on Groq: {e}. Using deterministic advisor response..."
            )

        # 3. Rule-based Fallback
        fallback_msg = (
            "ShieldSense Security Advisor: Based on our analysis, please avoid clicking suspicious links, "
            "do not share passwords or 2FA codes, and verify any urgent requests directly through official websites or phone lines."
        )
        return fallback_msg, "Deterministic Heuristic Engine"
