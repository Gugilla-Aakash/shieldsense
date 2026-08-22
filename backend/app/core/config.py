import os
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    PROJECT_NAME: str = "ShieldSense Backend"
    API_V1_STR: str = "/api/v1"

    # LLM API Keys
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    GROQ_API_KEY: Optional[str] = os.getenv("GROQ_API_KEY", "")
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./shieldsense.db")

    # Heuristic Thresholds
    RISK_SAFE_MAX: int = 29
    RISK_SUSPICIOUS_MAX: int = 59

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
