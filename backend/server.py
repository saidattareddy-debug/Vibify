from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

client: Optional[AsyncIOMotorClient] = None

app = FastAPI(title="Vibify API")
api_router = APIRouter(prefix="/api")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def get_database():
    global client

    mongo_url = os.environ.get("MONGO_URL")
    db_name = os.environ.get("DB_NAME")
    if not mongo_url or not db_name:
        raise HTTPException(
            status_code=500,
            detail="Backend database is not configured. Set MONGO_URL and DB_NAME.",
        )

    if client is None:
        client = AsyncIOMotorClient(mongo_url)

    return client[db_name]


# ----------------------- Models -----------------------
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    message: str = Field(..., min_length=1, max_length=4000)


class BookingCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    goal: Optional[str] = Field(default=None, max_length=2000)


class NewsletterCreate(BaseModel):
    email: EmailStr


class Submission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: Literal["contact", "booking", "newsletter"]
    name: Optional[str] = None
    email: str
    company: Optional[str] = None
    message: Optional[str] = None
    goal: Optional[str] = None
    created_at: str = Field(default_factory=now_iso)


# ----------------------- Routes -----------------------
@api_router.get("/")
async def root():
    return {"message": "Vibify API is live"}


async def _save(sub: Submission) -> Submission:
    db = get_database()
    await db.submissions.insert_one(sub.model_dump())
    return sub


@api_router.post("/contact", response_model=Submission)
async def create_contact(payload: ContactCreate):
    sub = Submission(type="contact", **payload.model_dump())
    return await _save(sub)


@api_router.post("/booking", response_model=Submission)
async def create_booking(payload: BookingCreate):
    sub = Submission(type="booking", **payload.model_dump())
    return await _save(sub)


@api_router.post("/newsletter", response_model=Submission)
async def create_newsletter(payload: NewsletterCreate):
    db = get_database()
    existing = await db.submissions.find_one(
        {"type": "newsletter", "email": payload.email}, {"_id": 0}
    )
    if existing:
        return Submission(**existing)
    sub = Submission(type="newsletter", email=payload.email)
    return await _save(sub)


@api_router.get("/submissions", response_model=List[Submission])
async def list_submissions(type: Optional[str] = None, limit: int = 200, skip: int = 0):
    db = get_database()
    limit = max(1, min(limit, 1000))
    skip = max(0, skip)
    query = {"type": type} if type else {}
    docs = (
        await db.submissions.find(query, {"_id": 0})
        .sort("created_at", -1)
        .skip(skip)
        .limit(limit)
        .to_list(limit)
    )
    return [Submission(**d) for d in docs]


@api_router.get("/stats")
async def get_stats():
    db = get_database()
    total = await db.submissions.count_documents({})
    contact = await db.submissions.count_documents({"type": "contact"})
    booking = await db.submissions.count_documents({"type": "booking"})
    newsletter = await db.submissions.count_documents({"type": "newsletter"})
    return {"total": total, "contact": contact, "booking": booking, "newsletter": newsletter}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    if client is not None:
        client.close()
