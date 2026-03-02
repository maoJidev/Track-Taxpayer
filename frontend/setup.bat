@echo off
echo Installing dependencies...
call npm install bootstrap sweetalert2 sweetalert2-react-content
if %errorlevel% neq 0 (
    echo Error installing dependencies. Please check your node installation.
    pause
    exit /b %errorlevel%
)

echo.
echo Starting development server...
call npm run dev
