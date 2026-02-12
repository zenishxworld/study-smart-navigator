# Study Abroad Decision Intelligence Platform

A production-ready, commission-neutral study abroad decision platform built with Next.js, TypeScript, PostgreSQL, and modern fintech-style UI.

## 🎯 Features

### For Students
- **Match Score Engine**: Personalized university rankings (40% Academic + 30% Budget + 20% ROI + 10% Visa Risk)
- **ROI Calculator**: Break-even analysis, loan simulations, and 5-year net gain projections
- **Verified Admits**: Browse real admit/reject data filtered by CGPA, IELTS, country
- **Application Tracker**: Manage application statuses and deadlines
- **User Dashboard**: Save comparisons, track applications, update profile

### For Admins
- **University Management**: Full CRUD operations
- **Admit Review System**: Approve/reject user-uploaded admits
- **Statistics Dashboard**: Platform metrics and insights
- **Data Management**: Update salary data, visa risks, rankings

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with structured schema
- **Authentication**: JWT-based session handling
- **Charts**: Recharts for data visualization
- **Validation**: Zod for schema validation

## 📁 Project Structure

```
study-abroad-platform/
├── app/                        # Next.js app directory
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── universities/      # University endpoints
│   │   ├── applications/      # Application tracking
│   │   ├── admits/            # Admit upload & browse
│   │   ├── user/              # User profile
│   │   ├── roi/               # ROI comparison
│   │   └── admin/             # Admin endpoints
│   ├── (pages)/               # Frontend pages
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/                 # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ScoreCircle.tsx
│   └── LoadingSpinner.tsx
├── lib/                        # Utilities
│   ├── db.ts                  # Database connection
│   ├── auth.ts                # JWT utilities
│   ├── scoring.ts             # Match score engine
│   ├── roi.ts                 # ROI calculation engine
│   └── validation.ts          # Input validation
├── database/                   # Database files
│   ├── schema.sql             # Database schema
│   └── seed.sql               # Seed data
└── public/                     # Static files

```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+

### 1. Clone and Install

```bash
cd study-abroad-platform
npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb study_abroad_db

# Run schema
psql -d study_abroad_db -f database/schema.sql

# Seed data (optional but recommended)
psql -d study_abroad_db -f database/seed.sql
```

### 3. Environment Variables

Create `.env.local`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/study_abroad_db
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Create Admin Account

Run this SQL to create admin user:

```sql
INSERT INTO users (email, password_hash, full_name, role)
VALUES (
  'admin@studyabroad.com',
  -- Password: admin123 (you should hash this properly)
  '$2a$10$YourHashedPasswordHere',
  'Admin User',
  'admin'
);
```

Or use the signup endpoint and manually update the role in the database.

## 📊 Database Schema

### Main Tables
- **users**: User accounts with academic profiles
- **universities**: University data (tuition, ranking, requirements)
- **programs**: Degree programs offered
- **application_tracking**: User application statuses
- **admit_data**: Verified admit/reject uploads
- **saved_comparisons**: User-saved university comparisons

See `database/schema.sql` for complete schema.

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- SQL injection prevention via parameterized queries
- File upload validation (type, size)
- Role-based access control (user/admin)
- Input sanitization

## 📈 Scoring Algorithm

**Overall Score = (Academic × 0.4) + (Budget × 0.3) + (ROI × 0.2) + (Visa × 0.1)**

- **Academic**: CGPA + IELTS vs requirements
- **Budget**: User budget vs total cost
- **ROI**: Break-even years (lower is better)
- **Visa**: Rejection risk (low/medium/high)

## 🎨 UI Design Principles

- **Modern fintech aesthetic**: Blue/white theme, glassmorphism
- **Responsive**: Mobile-first design
- **Smooth animations**: Tailwind transitions
- **Clear typography**: Inter font
- **Data visualization**: Charts and score circles
- **Loading states**: Spinners and skeletons

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login

### Universities
- `GET /api/universities` - List with filtering + match scores
- `GET /api/universities/[id]` - Detail view

### Applications
- `GET /api/applications` - User's applications
- `POST /api/applications` - Add application
- `PUT /api/applications/[id]` - Update status
- `DELETE /api/applications/[id]` - Remove

### Admits
- `GET /api/admits` - Browse verified admits
- `POST /api/admits/upload` - Upload admit letter

### ROI
- `POST /api/roi/compare` - Compare two universities

### Admin (requires admin role)
- `POST /api/admin/universities` - Create university
- `PUT /api/admin/universities/[id]` - Update
- `DELETE /api/admin/universities/[id]` - Delete
- `GET /api/admin/admits/pending` - Pending verifications
- `POST /api/admin/admits/[id]/approve` - Approve admit
- `DELETE /api/admin/admits/[id]/reject` - Reject admit
- `GET /api/admin/stats` - Platform statistics

## 📝 Legal Pages

Create these pages:
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service
- `/disclaimer` - Financial projection disclaimer

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel/Netlify

1. Connect GitHub repository
2. Set environment variables
3. Deploy

### Database Deployment

Use managed PostgreSQL:
- Heroku Postgres
- AWS RDS
- DigitalOcean Managed Databases
- Supabase

## 🎯 Future Enhancements

- [ ] Real-time chat support
- [ ] Email notifications
- [ ] Advanced filtering
- [ ] Mobile app
- [ ] Scholarship database
- [ ] University reviews
- [ ] AI-powered essay feedback

## 📞 Support

For questions or issues:
- Email: hello@studyabroad.com
- Documentation: See inline code comments

## ⚖️ License

Proprietary - All rights reserved

---

**Built with transparency, powered by data, driven by your success.**
