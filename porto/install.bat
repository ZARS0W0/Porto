@echo off
echo ========================================
echo Installing Tayef Portfolio Dependencies
echo ========================================
echo.

echo Step 1: Installing npm dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: npm install failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo Step 2: Verifying TypeScript installation...
call npx tsc --version

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo WARNING: TypeScript verification failed, but installation may still be successful.
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run 'deploy.bat' to start the development server
echo 2. Or run 'npm run dev' manually
echo.
pause

