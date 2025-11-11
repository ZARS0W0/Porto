@echo off
echo ========================================
echo Starting Tayef Portfolio Development Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo node_modules not found. Running installation first...
    echo.
    call install.bat
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Installation failed. Please fix errors and try again.
        pause
        exit /b 1
    )
    echo.
)

echo Starting Next.js development server...
echo.
echo The portfolio will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause

