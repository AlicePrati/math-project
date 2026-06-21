@echo off
start "Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\activate && uvicorn main:app --port 8001 --reload"
start "Frontend" cmd /k "cd /d %~dp0 && npm run dev"

