@echo off
echo ============================================================
echo   Stopping All E-Commerce Microservices
echo ============================================================
echo.

echo Killing processes on ports 3000-3004...

for %%p in (3000 3001 3002 3003 3004) do (
    for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%%p ^| findstr LISTENING') do (
        echo   Stopping PID %%a on port %%p
        taskkill /F /PID %%a >nul 2>&1
    )
)

echo.
echo All services stopped.
echo ============================================================
pause
