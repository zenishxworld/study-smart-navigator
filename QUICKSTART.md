# 🚀 Quick Start Guide

## Study Abroad Decision Intelligence Platform

### Prerequisites
- Node.js 18+ ✅ (Check: `node --version`)
- PostgreSQL 14+ (Download: https://www.postgresql.org/download/)
- npm or yarn

---

## ⚡ 3-Minute Setup

### 1. Dependencies (Already Done! ✅)
```bash
cd study-abroad-platform
npm install  # ✅ Completed!
```

### 2. Database Setup

**Windows (PowerShell):**
```powershell
.\setup.ps1
```

**Linux/Mac:**
```bash
chmod +x setup.sh && ./setup.sh
```

**Manual Setup:**
```bash
createdb study_abroad_db
psql -d study_abroad_db -f database/schema.sql
psql -d study_abroad_db -f database/seed.sql
```

### 3. Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/study_abroad_db
JWT_SECRET=your-secret-key-change-me-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run!
```bash
npm run dev
```

Visit: **http://localhost:3000** 🎉

---

## 👤 Test Accounts

### Create User Account
1. Go to http://localhost:3000/signup
2. Fill in the form
3. Login at http://localhost:3000/login

### Create Admin Account
1. Sign up normally
2. Run SQL:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```
3. Login - you'll be redirected to `/admin`

---

## 📚 What You Can Do

### As a User:
- ✅ Browse 25 universities with filters
- ✅ Get personalized match scores (40% Academic + 30% Budget + 20% ROI + 10% Visa)
- ✅ Track applications with deadlines
- ✅ Update academic profile (CGPA, IELTS, budget)

### As an Admin:
- ✅ Create/Edit/Delete universities (API: POST/PUT/DELETE `/api/admin/universities`)
- ✅ Review admit uploads (API: `/api/admin/admits/pending`)
- ✅ View platform statistics (API: `/api/admin/stats`)

---

## 📁 Key Files

- **Backend APIs**: `app/api/*`
- **Frontend Pages**: `app/*/page.tsx`
- **Components**: `components/*.tsx`
- **Business Logic**: `lib/*.ts`
- **Database**: `database/*.sql`

---

## 🔥 API Endpoints

### Public
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/universities` - Browse (with optional match scores if authenticated)

### Authenticated
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `GET /api/applications` - Track applications
- `POST /api/applications` - Add application

### Admin Only
- `POST /api/admin/universities` - Create university
- `GET /api/admin/stats` - Platform statistics

Full API docs: see `README.md`

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Auth**: JWT + bcrypt
- **Validation**: Zod

---

## 📊 Sample Data

The platform comes with **25 universities**:
- MIT, Stanford, Harvard (USA)
- Oxford, Cambridge (UK)
- Toronto, UBC (Canada)
- NUS, NTU (Singapore)
- And more!

---

## 🐛 Troubleshooting

**Database connection error?**
- Check PostgreSQL is running
- Verify `DATABASE_URL` in `.env.local`
- Try: `psql -d study_abroad_db -c "SELECT 1;"`

**JWT secret error?**
- Make sure `JWT_SECRET` is set in `.env.local`
- Use a random string (32+ characters)

**Port 3000 already in use?**
- Kill the process: `lsof -ti:3000 | xargs kill` (Mac/Linux)
- Or change port: `npm run dev -- -p 3001`

---

## 📚 Documentation

- **Full README**: `README.md`
- **Walkthrough**: `C:\Users\zenis\.gemini\antigravity\brain\644332a5-2ea6-4df1-8203-90728976a1da\walkthrough.md`
- **Project Summary**: `PROJECT_COMPLETE.md`

---

**🎓 Built with transparency. Powered by data. Ready to launch!**
