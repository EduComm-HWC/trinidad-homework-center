@echo off
REM Trinidad & Tobago Homework Centre - Windows Setup Script

echo.
echo Trinidad ^& Tobago Homework Centre - Setup
echo ==============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed. Please install Node.js 18 or higher.
    pause
    exit /b 1
)

echo [OK] Node.js version:
node -v

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X npm is not installed.
    pause
    exit /b 1
)

echo [OK] npm version:
npm -v
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo X Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed successfully
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo [OK] .env file created
    echo.
    echo WARNING: Edit the .env file and add your DATABASE_URL
    echo          For local development, you can use:
    echo          DATABASE_URL="file:./dev.db"
    echo.
) else (
    echo [i] .env file already exists
    echo.
)

REM Generate Prisma Client
echo Generating Prisma Client...
call npx prisma generate

if %ERRORLEVEL% NEQ 0 (
    echo X Failed to generate Prisma Client
    pause
    exit /b 1
)

echo.
echo [OK] Prisma Client generated successfully
echo.

REM Ask if user wants to set up database
set /p setup_db="Would you like to set up the database now? (y/n): "
if /i "%setup_db%"=="y" (
    echo Setting up database...
    call npx prisma db push
    
    echo.
    set /p seed_db="Would you like to seed the database with sample data? (y/n): "
    if /i "%seed_db%"=="y" (
        echo Seeding database...
        call npm run db:seed
        echo [OK] Database seeded with sample Trinidad ^& Tobago data
    )
)

echo.
echo ==============================================
echo [OK] Setup Complete!
echo.
echo Next steps:
echo 1. Edit .env file and set your DATABASE_URL (if not done)
echo 2. Run 'npm run dev' to start development server
echo 3. Open http://localhost:3000 in your browser
echo.
echo Useful commands:
echo   npm run dev       - Start development server
echo   npm run build     - Build for production
echo   npm run lint      - Check code quality
echo   npm run db:studio - Open Prisma Studio
echo   npm run db:push   - Update database schema
echo.
echo Read README.md for more information
echo Read DEPLOYMENT.md for Vercel deployment
echo.
echo Happy coding!
echo.
pause
