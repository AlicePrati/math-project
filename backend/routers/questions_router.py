import json
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter(prefix="/questions", tags=["questions"])


@router.get("", response_model=list[schemas.QuestionOut])
def get_questions(
    topic_id: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(models.Question)
    if topic_id:
        query = query.filter(models.Question.topic_id == topic_id)
    questions = query.order_by(models.Question.topic_id, models.Question.difficulty).all()

    result = []
    for q in questions:
        result.append(schemas.QuestionOut(
            id=q.id,
            topic_id=q.topic_id,
            difficulty=q.difficulty,
            question=q.question,
            options=json.loads(q.options),
            correct=q.correct,
            explanation=q.explanation,
        ))
    return result


@router.get("/topic/{topic_id}", response_model=list[schemas.QuestionOut])
def get_questions_by_topic(topic_id: str, db: Session = Depends(get_db)):
    questions = (
        db.query(models.Question)
        .filter(models.Question.topic_id == topic_id)
        .order_by(models.Question.difficulty)
        .all()
    )
    return [
        schemas.QuestionOut(
            id=q.id,
            topic_id=q.topic_id,
            difficulty=q.difficulty,
            question=q.question,
            options=json.loads(q.options),
            correct=q.correct,
            explanation=q.explanation,
        )
        for q in questions
    ]
