from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    ratings = relationship("UserRating", back_populates="user", cascade="all, delete-orphan")
    history = relationship("RatingHistory", back_populates="user", cascade="all, delete-orphan")
    progress = relationship("UserProgress", back_populates="user", uselist=False, cascade="all, delete-orphan")


class Question(Base):
    __tablename__ = "questions"

    id = Column(String, primary_key=True)          # es. "prop_01"
    topic_id = Column(String, index=True, nullable=False)
    difficulty = Column(Integer, nullable=False)   # 1–5
    question = Column(Text, nullable=False)
    options = Column(Text, nullable=False)         # JSON array ["A","B","C","D"]
    correct = Column(Integer, nullable=False)      # 0–3
    explanation = Column(Text, nullable=False)


class UserRating(Base):
    __tablename__ = "user_ratings"
    __table_args__ = (UniqueConstraint("user_id", "topic_id"),)

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    topic_id = Column(String, nullable=False, index=True)
    rating = Column(Integer, nullable=False)       # 1–5
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="ratings")


class RatingHistory(Base):
    __tablename__ = "rating_history"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    topic_id = Column(String, nullable=False)
    from_rating = Column(Integer, nullable=False)
    to_rating = Column(Integer, nullable=False)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="history")


class UserProgress(Base):
    __tablename__ = "user_progress"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    onboarding_complete = Column(Boolean, default=False)
    assessment_count = Column(Integer, default=0)
    last_assessment_date = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="progress")
