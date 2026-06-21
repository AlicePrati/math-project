from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from routers import auth_router, questions_router, ratings_router, study_plan_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Analisi 1 Tracker API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
        "http://localhost:5174",
        "https://math-project-production-32f1.up.railway.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(questions_router.router)
app.include_router(ratings_router.router)
app.include_router(study_plan_router.router)


@app.get("/")
def root():
    return {"status": "ok", "message": "Analisi 1 Tracker API"}
