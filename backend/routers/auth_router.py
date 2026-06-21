from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
import auth

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=schemas.Token, status_code=status.HTTP_201_CREATED)
def register(body: schemas.UserRegister, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == body.email).first():
        raise HTTPException(status_code=400, detail="Email già registrata")

    user = models.User(
        email=body.email,
        username=body.username,
        hashed_password=auth.hash_password(body.password),
    )
    db.add(user)
    db.flush()

    # Crea il record progress per il nuovo utente
    progress = models.UserProgress(user_id=user.id)
    db.add(progress)
    db.commit()
    db.refresh(user)

    return {"access_token": auth.create_access_token(user.id)}


@router.post("/login", response_model=schemas.Token)
def login(body: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == body.email).first()
    if not user or not auth.verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Email o password errati")

    return {"access_token": auth.create_access_token(user.id)}


@router.get("/me", response_model=schemas.UserOut)
def me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user


@router.patch("/me", response_model=schemas.UserOut)
def update_me(body: schemas.UserUpdate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    if body.username is not None:
        current_user.username = body.username or None
    db.commit()
    db.refresh(current_user)
    return current_user
