@echo off
echo ========================================
echo Starting FitFunda Backend Server
echo ========================================
echo.

cd /d "%~dp0"

echo Activating virtual environment...
call venv\Scripts\activate

echo.
echo Starting Uvicorn server...
echo Backend will be available at: http://localhost:8000
echo API Documentation at: http://localhost:8000/docs
echo.

uvicorn app.main:app --reload

pause
