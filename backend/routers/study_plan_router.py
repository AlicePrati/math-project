import json
import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from database import get_db
import models
import schemas
import auth

router = APIRouter(prefix="/study-plan", tags=["study-plan"])

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "study_plan_data")


def _load_section_data(section_id: str) -> list:
    path = os.path.join(DATA_DIR, f"{section_id}.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail=f"No study plan data for section '{section_id}'")
    with open(path, encoding="utf-8") as f:
        return json.load(f)


@router.post("/complete-exercise")
def complete_exercise(
    body: schemas.CompleteExerciseIn,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    existing = (
        db.query(models.StudyPlanCompletion)
        .filter_by(user_id=current_user.id, exercise_id=body.exercise_id)
        .first()
    )
    if existing:
        return {"ok": True}

    record = models.StudyPlanCompletion(
        user_id=current_user.id,
        exercise_id=body.exercise_id,
        section_id=body.section_id,
    )
    db.add(record)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
    return {"ok": True}


@router.get("/progress", response_model=schemas.StudyPlanProgressOut)
def get_progress(
    section_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    rows = (
        db.query(models.StudyPlanCompletion.exercise_id)
        .filter_by(user_id=current_user.id, section_id=section_id)
        .all()
    )
    return {"completed_exercise_ids": [r.exercise_id for r in rows]}


@router.get("/questions/{section_id}")
def get_questions(section_id: str, rating: int = 0):
    data = _load_section_data(section_id)
    if rating:
        data = [entry for entry in data if entry.get("rating") == rating]
    return data
