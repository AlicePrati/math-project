from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from database import get_db
import models
import schemas
import auth

router = APIRouter(prefix="/ratings", tags=["ratings"])


@router.get("/me", response_model=schemas.UserProgressOut)
def get_my_progress(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id
    ).first()

    ratings = {r.topic_id: r.rating for r in current_user.ratings}
    history = [
        schemas.RatingHistoryOut(
            topic_id=h.topic_id,
            from_rating=h.from_rating,
            to_rating=h.to_rating,
            timestamp=h.timestamp,
        )
        for h in sorted(current_user.history, key=lambda x: x.timestamp, reverse=True)
    ]

    return schemas.UserProgressOut(
        onboarding_complete=progress.onboarding_complete if progress else False,
        assessment_count=progress.assessment_count if progress else 0,
        last_assessment_date=progress.last_assessment_date if progress else None,
        ratings=ratings,
        history=history,
    )


@router.post("/complete-assessment")
def complete_assessment(
    body: schemas.CompleteAssessmentIn,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    now = datetime.now(timezone.utc)

    # Upsert ratings e registra la history
    existing = {r.topic_id: r for r in current_user.ratings}
    for topic_id, new_rating in body.ratings.items():
        old_rating = existing.get(topic_id)
        from_rating = old_rating.rating if old_rating else 0

        if old_rating:
            old_rating.rating = new_rating
            old_rating.updated_at = now
        else:
            db.add(models.UserRating(
                user_id=current_user.id,
                topic_id=topic_id,
                rating=new_rating,
                updated_at=now,
            ))

        if from_rating != new_rating:
            db.add(models.RatingHistory(
                user_id=current_user.id,
                topic_id=topic_id,
                from_rating=from_rating,
                to_rating=new_rating,
                timestamp=now,
            ))

    # Aggiorna il progress
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id
    ).first()
    if not progress:
        progress = models.UserProgress(user_id=current_user.id)
        db.add(progress)

    progress.onboarding_complete = True
    progress.assessment_count += 1
    progress.last_assessment_date = now

    db.commit()
    return {"ok": True, "assessment_count": progress.assessment_count}


@router.delete("/reset")
def reset_progress(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    db.query(models.UserRating).filter(models.UserRating.user_id == current_user.id).delete()
    db.query(models.RatingHistory).filter(models.RatingHistory.user_id == current_user.id).delete()
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id
    ).first()
    if progress:
        progress.onboarding_complete = False
        progress.assessment_count = 0
        progress.last_assessment_date = None
    db.commit()
    return {"ok": True}
