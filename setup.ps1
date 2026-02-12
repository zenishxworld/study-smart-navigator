# Study Abroad Platform - Setup Script for Windows
# Run this in PowerShell

Write-Host "🎓 Study Abroad Platform - Database Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Database credentials
$DB_USER = Read-Host "Enter PostgreSQL username (default: postgres)"
if ([string]::IsNullOrWhiteSpace($DB_USER)) { $DB_USER = "postgres" }

$DB_NAME = Read-Host "Enter database name (default: study_abroad_db)"
if ([string]::IsNullOrWhiteSpace($DB_NAME)) { $DB_NAME = "study_abroad_db" }

Write-Host ""
Write-Host "📦 Creating database..." -ForegroundColor Yellow

# Create database
createdb -U $DB_USER $DB_NAME 2>$null

Write-Host "✅ Database created (or already exists)" -ForegroundColor Green

Write-Host ""
Write-Host "📊 Running schema migration..." -ForegroundColor Yellow

# Run schema
psql -U $DB_USER -d $DB_NAME -f database/schema.sql

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Schema created successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to create schema" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🌱 Seeding database with sample universities..." -ForegroundColor Yellow

# Seed data
psql -U $DB_USER -d $DB_NAME -f database/seed.sql

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database seeded successfully" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: Seeding may have failed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Copy .env.example to .env.local and update it"
Write-Host "  2. Run: npm run dev"
Write-Host "  3. Visit: http://localhost:3000"
Write-Host ""
Write-Host "🔐 Create admin user through signup and manually update role in database" -ForegroundColor Yellow
Write-Host ""
