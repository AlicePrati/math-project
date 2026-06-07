from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Dict, List, Any, Union


# ── Auth ──────────────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    username: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: int
    email: str
    username: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    username: Optional[str] = None


# ── Questions ─────────────────────────────────────────────────────────────────

class QuestionOut(BaseModel):
    id: str
    topic_id: str
    type: str                              # 'mcq' | 'tf' | 'arrange'
    difficulty: int
    question: str
    options: Optional[List[str]] = None   # mcq/tf only
    bank: Optional[List[str]] = None      # arrange only
    correct: Optional[Any] = None         # None (mcq) | int (tf) | List[str] (arrange)
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
