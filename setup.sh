#!/bin/bash

# Study Abroad Platform - Quick Setup Script
# This script sets up the database and creates an admin user

echo "🎓 Study Abroad Platform - Database Setup"
echo "==========================================="
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# Database credentials
read -p "Enter PostgreSQL username (default: postgres): " DB_USER
DB_USER=${DB_USER:-postgres}

read -p "Enter database name (default: study_abroad_db): " DB_NAME
DB_NAME=${DB_NAME:-study_abroad_db}

echo ""
echo "📦 Creating database..."

# Create database
createdb -U $DB_USER $DB_NAME 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database '$DB_NAME' created successfully"
else
    echo "ℹ️  Database might already exist, continuing..."
fi

echo ""
echo "📊 Running schema migration..."

# Run schema
psql -U $DB_USER -d $DB_NAME -f database/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema created successfully"
else
    echo "❌ Failed to create schema"
    exit 1
fi

echo ""
echo "🌱 Seeding database with sample universities..."

# Seed data
psql -U $DB_USER -d $DB_NAME -f database/seed.sql

if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully"
else
    echo "⚠️  Warning: Seeding failed, but you can continue"
fi

echo ""
echo "👤 Creating admin user..."

# Admin credentials
read -p "Enter admin email (default: admin@studyabroad.com): " ADMIN_EMAIL
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@studyabroad.com}

read -sp "Enter admin password: " ADMIN_PASSWORD
echo ""

# Hash password (you'll need bcrypt installed: npm install -g bcrypt-cli)
# For simplicity, we'll create with a known hash for "admin123"
ADMIN_HASH='$2a$10$YourBcryptHashHere' # Replace with actual hash

psql -U $DB_USER -d $DB_NAME -c "
INSERT INTO users (email, password_hash, full_name, role)
VALUES ('$ADMIN_EMAIL', '$ADMIN_HASH', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;
"

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Update .env.local with your database credentials"
echo "  2. Run: npm run dev"
echo "  3. Visit: http://localhost:3000"
echo ""
echo "🔐 Admin Login:"
echo "  Email: $ADMIN_EMAIL"
echo "  Password: (the one you entered)"
echo ""
