// ROI Calculator Engine

export interface ROIInput {
    tuition_fee: number;
    living_cost: number;
    duration_years: number;
    average_salary: number;
    country: string;
    loan_amount?: number;
    loan_rate?: number;
    loan_term_years?: number;
}

export interface ROIResult {
    totalCost: number;
    annualCost: number;
    afterTaxSalary: number;
    breakEvenYears: number;
    fiveYearNetGain: number;
    fiveYearEarnings: number;
    monthlyLoanPayment: number;
    totalLoanInterest: number;
    yearlyProjection: { year: number; earnings: number; cumulative: number }[];
}

const TAX_RATES: Record<string, number> = {
    USA: 0.25,
    UK: 0.30,
    Canada: 0.27,
    Australia: 0.28,
    Germany: 0.35,
    Singapore: 0.15,
    Netherlands: 0.37,
    Ireland: 0.20,
    'New Zealand': 0.28,
};

export function calculateROI(input: ROIInput): ROIResult {
    const totalCost = (input.tuition_fee + input.living_cost) * input.duration_years;
    const annualCost = input.tuition_fee + input.living_cost;

    const taxRate = TAX_RATES[input.country] || 0.25;
    const afterTaxSalary = input.average_salary * (1 - taxRate);

    // Loan calculation
    let monthlyLoanPayment = 0;
    let totalLoanInterest = 0;
    if (input.loan_amount && input.loan_rate && input.loan_term_years) {
        const r = input.loan_rate / 100 / 12;
        const n = input.loan_term_years * 12;
        if (r > 0) {
            monthlyLoanPayment = input.loan_amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            totalLoanInterest = (monthlyLoanPayment * n) - input.loan_amount;
        } else {
            monthlyLoanPayment = input.loan_amount / n;
        }
    }

    const annualLoanPayment = monthlyLoanPayment * 12;

    // Break-even (accounting for loan payments)
    const annualNetIncome = afterTaxSalary - annualLoanPayment;
    const breakEvenYears = annualNetIncome > 0
        ? Math.round((totalCost / annualNetIncome) * 10) / 10
        : 99;

    // 5-year projection with 3% annual growth
    const yearlyProjection = [];
    let cumulative = -totalCost;
    let salary = afterTaxSalary;

    for (let year = 1; year <= 5; year++) {
        const netEarnings = salary - annualLoanPayment;
        cumulative += netEarnings;
        yearlyProjection.push({
            year,
            earnings: Math.round(netEarnings),
            cumulative: Math.round(cumulative),
        });
        salary *= 1.03;
    }

    const fiveYearEarnings = yearlyProjection.reduce((sum, y) => sum + y.earnings, 0);
    const fiveYearNetGain = fiveYearEarnings - totalCost;

    return {
        totalCost: Math.round(totalCost),
        annualCost: Math.round(annualCost),
        afterTaxSalary: Math.round(afterTaxSalary),
        breakEvenYears,
        fiveYearNetGain: Math.round(fiveYearNetGain),
        fiveYearEarnings: Math.round(fiveYearEarnings),
        monthlyLoanPayment: Math.round(monthlyLoanPayment),
        totalLoanInterest: Math.round(totalLoanInterest),
        yearlyProjection,
    };
}

export function compareROI(a: ROIInput, b: ROIInput) {
    return {
        universityA: calculateROI(a),
        universityB: calculateROI(b),
    };
}
