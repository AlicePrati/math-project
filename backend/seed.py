"""
Popola il database con le domande lette dai file JSON del frontend.
Eseguire una sola volta (o ogni volta che i JSON cambiano):

    python seed.py

Il DB viene ricreato da zero (cancellare analisi1.db prima se già esiste).
"""
import json
import os
import glob
import sys

sys.path.insert(0, os.path.dirname(__file__))

from database import SessionLocal, engine
import models

models.Base.metadata.create_all(bind=engine)

SRC_DIR = os.path.join(os.path.dirname(__file__), "../src/data/questions")
SECTION_FILES = [
    "prerequisiti", "numeri_reali", "successioni", "limiti", "continuita",
    "derivate", "studio_funzione", "taylor", "integrale_riemann",
    "tecniche_int", "integrali_impropri", "edo",
]

db = SessionLocal()
total = 0

for section in SECTION_FILES:
    path = os.path.join(SRC_DIR, f"{section}.json")
    if not os.path.exists(path):
        print(f"  WARN: {section}.json not found, skipping")
        continue

    with open(path, encoding="utf-8") as f:
        questions = json.load(f)

    for q in questions:
        q_type = q.get("type", "mcq")

        if q_type == "mcq":
            db_q = models.Question(
                id=q["id"],
                topic_id=q["topicId"],
                type="mcq",
                difficulty=q["difficulty"],
                question=q["question"],
                options=json.dumps(q["options"]),
                bank=None,
                correct=None,   # correct is always options[0] by convention
                explanation=q["explanation"],
            )
        elif q_type == "tf":
            db_q = models.Question(
                id=q["id"],
                topic_id=q["topicId"],
                type="tf",
                difficulty=q["difficulty"],
                question=q["question"],
                options=json.dumps(q["options"]),
                bank=None,
                correct=str(q["correct"]),   # "0" or "1"
                explanation=q["explanation"],
            )
        elif q_type == "arrange":
            db_q = models.Question(
                id=q["id"],
                topic_id=q["topicId"],
                type="arrange",
                difficulty=q["difficulty"],
                question=q["question"],
                options=None,
                bank=json.dumps(q["bank"]),
                correct=json.dumps(q["correct"]),  # JSON list[str]
                explanation=q["explanation"],
            )
        else:
            print(f"  WARN: unknown type '{q_type}' for id={q['id']}, skipping")
            continue

        db.merge(db_q)
        total += 1

    print(f"OK {section}.json - {len(questions)} questions")

db.commit()
db.close()
print(f"\nTotal: {total} questions inserted/updated in DB.")
