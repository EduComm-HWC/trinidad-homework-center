#!/bin/bash

# Trinidad & Tobago Homework Centre - Setup Script
# This script sets up your local development environment

set -e  # Exit on error

echo "🇹🇹 Trinidad & Tobago Homework Centre - Setup"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed successfully"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit the .env file and add your DATABASE_URL"
    echo "   For local development, you can use:"
    echo "   DATABASE_URL=\"file:./dev.db\""
    echo ""
else
    echo "ℹ️  .env file already exists"
    echo ""
fi

# Generate Prisma Client
echo "🔨 Generating Prisma Client..."
npx prisma generate

echo ""
echo "✅ Prisma Client generated successfully"
echo ""

# Ask if user wants to set up database
read -p "Would you like to set up the database now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗄️  Setting up database..."
    npx prisma db push
    
    echo ""
    read -p "Would you like to seed the database with sample data? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🌱 Seeding database..."
        npm run db:seed
        echo "✅ Database seeded with sample Trinidad & Tobago data"
    fi
fi

echo ""
echo "=============================================="
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file and set your DATABASE_URL (if not done)"
echo "2. Run 'npm run dev' to start development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Useful commands:"
echo "  npm run dev       - Start development server"
echo "  npm run build     - Build for production"
echo "  npm run lint      - Check code quality"
echo "  npm run db:studio - Open Prisma Studio"
echo "  npm run db:push   - Update database schema"
echo ""
echo "📚 Read README.md for more information"
echo "🚀 Read DEPLOYMENT.md for Vercel deployment"
echo ""
echo "Happy coding! 🎉"
