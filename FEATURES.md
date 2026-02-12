# 🎯 Core Features Guide

## Study Abroad Decision Intelligence Platform

---

## 1. Match Score Algorithm

### How It Works
Your personalized match score is calculated using a **transparent weighted formula**:

```
Overall Score = (Academic × 0.4) + (Budget × 0.3) + (ROI × 0.2) + (Visa × 0.1)
```

### Components Breakdown

#### Academic Fit (40%)
Compares your profile against university requirements:
- **CGPA**: Your CGPA vs. minimum required
  - Above requirement by 0.5+: 100 points
  - Meets requirement: 85 points
  - Below by 0.2: 70 points
  - Below by 0.5+: 40 points

- **IELTS**: Your score vs. required score
  - Above by 1.0+: 100 points
  - Meets requirement: 85 points
  - Below by 0.5: 60 points
  - Below by 1.0+: 30 points

#### Budget Fit (30%)
How well the university fits your financial capacity:
- Total Cost = Tuition + Living Expenses
- **Perfect fit**: Cost ≤ 80% of budget → 100 points
- **Good fit**: Cost ≤ 100% of budget → 85 points
- **Stretching**: Cost 100-120% of budget → 60 points
- **Over budget**: Cost > 120% → 30 points

#### ROI Score (20%)
Based on break-even years:
- **Break-Even** = Total Cost ÷ Average Salary
- **Excellent**: ≤ 2 years → 100 points
- **Good**: 2-3 years → 80 points
- **Fair**: 3-4 years → 60 points
- **Poor**: > 4 years → 40 points

#### Visa Risk (10%)
Country-specific visa difficulty:
- **Low Risk** (Canada, Australia): 100 points
- **Medium Risk** (UK, USA): 70 points
- **High Risk** (strict policies): 40 points

### Example
**Student Profile**:
- CGPA: 3.5 / 4.0
- IELTS: 7.5 / 9.0
- Budget: $50,000

**University**:
- Required CGPA: 3.0
- Required IELTS: 6.5
- Total Cost: $45,000
- Average Salary: $60,000
- Country: Canada (Low visa risk)

**Calculation**:
- Academic: 95 (CGPA: 100, IELTS: 90) × 0.4 = **38**
- Budget: 100 (well within budget) × 0.3 = **30**
- ROI: 100 (break-even < 1 year) × 0.2 = **20**
- Visa: 100 (low risk) × 0.1 = **10**

**Total Match Score: 98/100** ✅ Excellent Match!

---

## 2. ROI Calculator

### What It Calculates

#### A. Total Investment
```
Total Cost = Tuition + (Living Cost × Years)
```

#### B. Loan Simulation
If you're taking a loan:
```
Monthly Payment = Principal × [r(1+r)^n] / [(1+r)^n - 1]
where:
  r = monthly interest rate (e.g., 7% APR / 12)
  n = number of months (loan term × 12)
```

Example:
- Loan: $50,000
- Rate: 7% APR
- Term: 10 years
- **Monthly Payment**: ~$580
- **Total Interest**: ~$19,600

#### C. After-Tax Salary
```
After-Tax = Gross Salary × (1 - Tax Rate)

Tax Rates:
- USA: 25%
- UK: 30%
- Canada: 27%
- Australia: 28%
```

#### D. Break-Even Analysis
```
Break-Even Years = Total Cost ÷ After-Tax Salary
```

Example:
- Total Cost: $50,000
- After-Tax Salary: $45,000
- **Break-Even**: 1.11 years ✅

#### E. 5-Year Net Gain
Assumes 3% annual salary growth:
```
Year 1: $45,000
Year 2: $46,350 (+ 3%)
Year 3: $47,741
Year 4: $49,173
Year 5: $50,648

Total 5-Year Earnings: $238,912
Minus Total Cost: $50,000
Net Gain: $188,912 ✅
```

### ROI Comparison
Compare two universities side-by-side:

**MIT vs. UBC**

| Metric | MIT | UBC |
|--------|-----|-----|
| Total Cost | $75,000 | $40,000 |
| Avg Salary | $90,000 | $55,000 |
| Break-Even | 0.83 years | 0.73 years |
| 5-Year Net Gain | $267,500 | $157,000 |
| **Winner** | Higher earnings | Faster break-even |

**Decision**: Choose based on priorities (quick ROI vs. long-term earnings)

---

## 3. Admit Data System

### How It Works
1. **Upload**: Students upload admit/reject letters
2. **Verification**: Admins review and verify authenticity
3. **Anonymization**: Sensitive info is blurred
4. **Display**: Verified data is searchable

### Filters Available
- Country
- University
- Course/Program
- CGPA range
- IELTS score range
- Admit vs. Reject

### Example Use Case
**Search**: "Show me admits to Stanford CS with CGPA 3.5-4.0 and IELTS 7.5+"

**Results**:
- Student A: CGPA 3.8, IELTS 8.0 → **Admitted** ✅
- Student B: CGPA 3.6, IELTS 7.5 → **Rejected** ❌
- Student C: CGPA 3.9, IELTS 8.5 → **Admitted** ✅

**Insight**: Stanford CS prefers CGPA 3.8+ for Indian applicants

---

## 4. Application Tracker

### Features
- Track multiple university applications
- Set deadlines with reminders (future enhancement)
- Update status as you progress:
  - Applied
  - Under Review
  - Interview Scheduled
  - Admitted
  - Rejected

### Example Workflow
1. Browse universities → Find MIT (Match Score: 92)
2. Click "Track Application"
3. Add deadline: March 15, 2024
4. Update status as you progress
5. Dashboard shows all applications in one place

---

## 5. Admin Panel (Backend Ready)

### Features
- **University CRUD**: Create, update, delete universities
- **Admit Review**: Approve/reject user submissions
- **Statistics Dashboard**: Platform metrics
- **Data Management**: Update rankings, salaries

### API Endpoints
```
POST   /api/admin/universities       - Create university
PUT    /api/admin/universities/:id   - Update university
DELETE /api/admin/universities/:id   - Delete university
GET    /api/admin/admits/pending     - Get pending reviews
POST   /api/admin/admits/:id/approve - Approve admit
DELETE /api/admin/admits/:id/reject  - Reject admit
GET    /api/admin/stats               - Platform statistics
```

---

## 6. Security Features

### Authentication
- **JWT Tokens**: 7-day expiration
- **Password Hashing**: bcrypt with 10 salt rounds
- **Role-Based Access**: User vs. Admin

### Input Validation
- **Zod Schemas**: Type-safe validation
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Input sanitization
- **File Upload**: Type/size limits

### Data Protection
- Passwords never stored in plain text
- Sensitive fields encrypted
- HTTPS required in production

---

## 7. Transparency Commitment

### No Commission Policy
- ✅ We don't receive money from universities
- ✅ We don't favor certain institutions
- ✅ Rankings are purely data-driven
- ✅ No affiliate links or kickbacks

### Data Sources
- **Tuition**: Official university websites
- **Salaries**: Payscale, Glassdoor, LinkedIn
- **Living Costs**: Numbeo, Expatistan
- **Rankings**: QS, THE, US News
- **Visa**: Official immigration websites

### Methodology Published
See `/transparency` page for full algorithm explanation

---

## 🚀 Getting Started

1. **Sign Up**: Create account with academic profile
2. **Browse**: Explore 25 universities with match scores
3. **Compare**: Use ROI calculator for financial projections
4. **Track**: Add universities to application tracker
5. **Decide**: Make data-driven choices!

---

**🎓 Questions? Check README.md or QUICKSTART.md**
