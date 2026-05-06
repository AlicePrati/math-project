"""
Popola il database con il dataset di domande.
Eseguire una sola volta: python seed.py
"""
import json
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from database import SessionLocal, engine
import models

models.Base.metadata.create_all(bind=engine)

# Dataset domande — stessa struttura dei file TypeScript del frontend
# Aggiungere qui le domande man mano che vengono create
QUESTIONS: list[dict] = [
    # ── logica_proposizioni ──────────────────────────────────────────────────
    {"id": "prop_01", "topic_id": "logica_proposizioni", "difficulty": 1,
     "question": "Quale delle seguenti è una proposizione logica?",
     "options": ["Chiudi la porta!", "Il numero 7 è primo.", "Quanto fa 2+2?", "Che bella giornata!"],
     "correct": 1,
     "explanation": "Una proposizione logica è un enunciato dichiarativo con valore di verità definito."},

    {"id": "prop_02", "topic_id": "logica_proposizioni", "difficulty": 2,
     "question": "Se P è vera e Q è falsa, qual è il valore di verità di P ∧ Q?",
     "options": ["Vero", "Falso", "Dipende dal contesto", "Non determinabile"],
     "correct": 1,
     "explanation": "La congiunzione P ∧ Q è vera solo se entrambe le proposizioni sono vere."},

    {"id": "prop_03", "topic_id": "logica_proposizioni", "difficulty": 3,
     "question": "Qual è la negazione di 'P ∨ Q'?",
     "options": ["¬P ∨ ¬Q", "¬P ∧ ¬Q", "P ∧ ¬Q", "¬P ∨ Q"],
     "correct": 1,
     "explanation": "Per le leggi di De Morgan: ¬(P ∨ Q) = ¬P ∧ ¬Q."},

    {"id": "prop_04", "topic_id": "logica_proposizioni", "difficulty": 4,
     "question": "Una tautologia è una proposizione composta che:",
     "options": ["È vera solo quando tutte le sue parti sono vere",
                 "È sempre falsa",
                 "È sempre vera, indipendentemente dai valori delle sue componenti",
                 "Può essere sia vera che falsa"],
     "correct": 2,
     "explanation": "Una tautologia è sempre vera per qualsiasi assegnazione di valori."},

    {"id": "prop_05", "topic_id": "logica_proposizioni", "difficulty": 5,
     "question": "Qual è il valore di verità di (P → Q) ↔ (¬Q → ¬P)?",
     "options": ["Sempre vero (tautologia)", "Sempre falso", "Vero solo se P=Q", "Vero solo se P vera"],
     "correct": 0,
     "explanation": "È il principio del contronominale: sempre vera, quindi tautologia."},

    # ── logica_quantificatori ────────────────────────────────────────────────
    {"id": "quant_01", "topic_id": "logica_quantificatori", "difficulty": 1,
     "question": "Come si legge ∀x ∈ ℝ, x² ≥ 0?",
     "options": ["Esiste un reale x tale che x² ≥ 0",
                 "Per ogni numero reale x, x² è ≥ 0",
                 "Per qualche reale x, x² ≥ 0",
                 "Il reale x soddisfa x² ≥ 0"],
     "correct": 1,
     "explanation": "∀ è il quantificatore universale: 'per ogni'."},

    {"id": "quant_02", "topic_id": "logica_quantificatori", "difficulty": 2,
     "question": "Qual è la negazione di '∀x ∈ ℝ, x > 0'?",
     "options": ["∀x ∈ ℝ, x ≤ 0", "∃x ∈ ℝ, x ≤ 0", "∃x ∈ ℝ, x > 0", "∀x ∈ ℝ, x < 0"],
     "correct": 1,
     "explanation": "¬(∀x P(x)) = ∃x ¬P(x)."},

    {"id": "quant_03", "topic_id": "logica_quantificatori", "difficulty": 3,
     "question": "Quale affermazione è VERA?",
     "options": ["∀x∃y:y>x equivale a ∃y∀x:y>x",
                 "∃x ∈ ℝ : x² = -1",
                 "∀x ∈ ℝ, ∃y ∈ ℝ : y > x",
                 "∃x ∈ ℕ : x < 0"],
     "correct": 2,
     "explanation": "Per ogni x reale, basta prendere y = x+1."},

    {"id": "quant_04", "topic_id": "logica_quantificatori", "difficulty": 4,
     "question": "Qual è la negazione di '∃x ∈ ℕ, ∀y ∈ ℕ, x ≤ y'?",
     "options": ["∀x ∈ ℕ, ∃y ∈ ℕ : x > y", "∃x,y ∈ ℕ : x > y",
                 "∀x,y ∈ ℕ, x > y", "∃x ∈ ℕ, ∀y, x > y"],
     "correct": 0,
     "explanation": "¬(∃x, ∀y, x≤y) = ∀x, ∃y, x>y."},

    {"id": "quant_05", "topic_id": "logica_quantificatori", "difficulty": 5,
     "question": "'∀ε>0, ∃δ>0 : |x-a|<δ ⟹ |f(x)-L|<ε' è:",
     "options": ["La definizione di derivata",
                 "La definizione di limite di f(x) per x→a uguale a L",
                 "La definizione di continuità uniforme",
                 "Il teorema di Bolzano"],
     "correct": 1,
     "explanation": "È la classica definizione epsilon-delta di limite."},

    # ── implicazione ─────────────────────────────────────────────────────────
    {"id": "impl_01", "topic_id": "implicazione", "difficulty": 1,
     "question": "L'implicazione P → Q è falsa quando:",
     "options": ["P falsa e Q vera", "P vera e Q vera", "P vera e Q falsa", "P falsa e Q falsa"],
     "correct": 2,
     "explanation": "P→Q è falsa solo quando P è vera e Q è falsa."},

    {"id": "impl_02", "topic_id": "implicazione", "difficulty": 2,
     "question": "Il contronominale di 'Se piove, il terreno è bagnato' è:",
     "options": ["Se bagnato, piove",
                 "Se non piove, non bagnato",
                 "Se non bagnato, non piove",
                 "Se non piove, bagnato"],
     "correct": 2,
     "explanation": "Contronominale di P→Q è ¬Q→¬P."},

    {"id": "impl_03", "topic_id": "implicazione", "difficulty": 3,
     "question": "'n divisibile per 4' rispetto a 'n divisibile per 2' è:",
     "options": ["Necessaria ma non sufficiente",
                 "Sufficiente ma non necessaria",
                 "Necessaria e sufficiente",
                 "Né necessaria né sufficiente"],
     "correct": 1,
     "explanation": "4|n implica 2|n (sufficiente), ma non viceversa."},

    {"id": "impl_04", "topic_id": "implicazione", "difficulty": 4,
     "question": "Quale è logicamente equivalente a P → Q?",
     "options": ["Q → P", "¬P → ¬Q", "¬Q → ¬P", "¬P ∧ Q"],
     "correct": 2,
     "explanation": "Solo il contronominale ¬Q→¬P è equivalente a P→Q."},

    {"id": "impl_05", "topic_id": "implicazione", "difficulty": 5,
     "question": "La dimostrazione che √2 è irrazionale usa:",
     "options": ["Implicazione diretta", "Contronominale",
                 "Assurdo: si assume √2 ∈ ℚ e si arriva a contraddizione",
                 "Induzione"],
     "correct": 2,
     "explanation": "Si assume √2=p/q, si ottiene che 2|p e 2|q, contraddizione."},
]


def seed():
    db = SessionLocal()
    try:
        count = db.query(models.Question).count()
        if count > 0:
            print(f"Database già popolato con {count} domande. Uscita.")
            return

        for q in QUESTIONS:
            db.add(models.Question(
                id=q["id"],
                topic_id=q["topic_id"],
                difficulty=q["difficulty"],
                question=q["question"],
                options=json.dumps(q["options"], ensure_ascii=False),
                correct=q["correct"],
                explanation=q["explanation"],
            ))

        db.commit()
        print(f"Seed completato: {len(QUESTIONS)} domande inserite.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
