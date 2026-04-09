@echo off
echo Starting OLMS Development Environment...

echo Starting backend server...
cd server
start "Backend Server" cmd /k "npm run dev"

echo Waiting for server to start...
timeout /t 3 /nobreak > nul

echo Starting frontend...
cd ..
start "Frontend Server" cmd /k "npm run dev"

echo Development servers are starting...
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
pause
