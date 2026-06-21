import json
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter(prefix="/questions", tags=["questions"])


def serialize_question(q: models.Question) -> schemas.QuestionOut:
    """Convert a Question DB row to the appropriate QuestionOut schema."""
    if q.type == "mcq":
        return schemas.QuestionOut(
            id=q.id,
            topic_id=q.topic_id,
            type=q.type,
            difficulty=q.difficulty,
            question=q.question,
            options=json.loads(q.options) if q.options else None,
            bank=None,
            correct=None,
            explanation=q.explanation,
        )
    elif q.type == "tf":
        return schemas.QuestionOut(
            id=q.id,
            topic_id=q.topic_id,
            type=q.type,
            difficulty=q.difficulty,
            question=q.question,
            options=json.loads(q.options) if q.options else None,
            bank=None,
            correct=int(q.correct) if q.correct is not None else None,
            explanation=q.explanation,
        )
    else:  # arrange
        return schemas.QuestionOut(
            id=q.id,
            topic_id=q.topic_id,
            type=q.type,
            difficulty=q.difficulty,
            question=q.question,
            options=None,
            bank=json.loads(q.bank) if q.bank else None,
            correct=json.loads(q.correct) if q.correct else None,
            explanation=q.explanation,
        )


@router.get("", response_model=list[schemas.QuestionOut])
def get_questions(
    topic_id: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(models.Question)
    if topic_id:
        query = query.filter(models.Question.topic_id == topic_id)
    questions = query.order_by(models.Question.topic_id, models.Question.difficulty).all()
    return [serialize_question(q) for q in questions]


@router.get("/topic/{topic_id}", response_model=list[schemas.QuestionOut])
def get_questions_by_topic(topic_id: str, db: Session = Depends(get_db)):
    questions = (
        db.query(models.Question)
        .filter(models.Question.topic_id == topic_id)
        .order_by(models.Question.difficulty)
        .all()
    )
    return [serialize_question(q) for q in questions]
