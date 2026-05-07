@echo off
echo Avvio backend (porta 8001)...
start "Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\uvicorn main:app --port 8001 --reload"

timeout /t 2 /nobreak >nul

echo Avvio frontend (porta 5173)...
start "Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo Backend:  http://localhost:8001
echo Frontend: http://localhost:5173
echo.
echo Chiudi le due finestre nere per spegnere i server.
pause
