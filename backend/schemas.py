from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Dict, List


# ── Auth ──────────────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: int
    email: str
    created_at: datetime

    class Config:
        orm_mode = True


# ── Questions ─────────────────────────────────────────────────────────────────

class QuestionOut(BaseModel):
    id: str
    topic_id: str
    difficulty: int
    question: str
    options: List[str]
    correct: int
    explanation: str

    class Config:
        orm_mode = True


# ── Ratings ───────────────────────────────────────────────────────────────────

class CompleteAssessmentIn(BaseModel):
    ratings: Dict[str, int]


class RatingOut(BaseModel):
    topic_id: str
    rating: int
    updated_at: datetime

    class Config:
        orm_mode = True


class RatingHistoryOut(BaseModel):
    topic_id: str
    from_rating: int
    to_rating: int
    timestamp: datetime

    class Config:
        orm_mode = True


class UserProgressOut(BaseModel):
    onboarding_complete: bool
    assessment_count: int
    last_assessment_date: Optional[datetime]
    ratings: Dict[str, int]
    history: List[RatingHistoryOut]
