#!/bin/bash

# E-Math-Sci School Platform Setup Script
# This script sets up the development environment

echo "🚀 Setting up E-Math-Sci School Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Please install MongoDB first."
    echo "Visit: https://www.mongodb.com/try/download/community"
    echo "Continuing with setup..."
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Create environment files
echo "⚙️  Setting up environment files..."

# Backend .env
if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "✅ Created backend/.env from template"
else
    echo "ℹ️  backend/.env already exists"
fi

# Frontend .env
if [ ! -f "frontend/.env" ]; then
    cp frontend/env.example frontend/.env
    echo "✅ Created frontend/.env from template"
else
    echo "ℹ️  frontend/.env already exists"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p backend/uploads
mkdir -p frontend/public/images
mkdir -p database/backups
mkdir -p logs

echo "✅ Setup complete!"
echo ""
echo "🎉 E-Math-Sci School Platform is ready!"
echo ""
echo "Next steps:"
echo "1. Start MongoDB: mongod"
echo "2. Start the development servers: npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For more information, see README.md"
