from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import setup_logging
from app.db.session import init_db
from app.api.routes import scan, history, action
from app.api.routes import scan, history, action, chat  # <-- import chat

# Under your other router inclusions:
# Setup logging
setup_logging()

# Initialize Database tables
init_db()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="ShieldSense - AI-Powered Digital Security Guard Backend",
    version="1.0.0",
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(scan.router, prefix=f"{settings.API_V1_STR}/scan", tags=["Scan"])
app.include_router(
    history.router, prefix=f"{settings.API_V1_STR}/history", tags=["History"]
)
app.include_router(
    action.router, prefix=f"{settings.API_V1_STR}/action", tags=["Action"]
)


app.include_router(
    chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["AI Advisor Chat"]
)


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "service": settings.PROJECT_NAME}
