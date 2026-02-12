// Scoring Engine - Match Score Calculator
// Transparent weighted algorithm: 40% Academic + 30% Budget + 20% ROI + 10% Visa

export interface UserProfile {
    cgpa: number;
    ielts: number;
    budget: number;
}

export interface UniversityData {
    minimum_cgpa: number;
    required_ielts: number;
    tuition_fee: number;
    living_cost: number;
    average_salary: number;
    visa_difficulty: string;
}

export interface MatchScore {
    overall: number;
    academic: number;
    budget: number;
    roi: number;
    visa: number;
    breakdown: {
        cgpaScore: number;
        ieltsScore: number;
        costFit: number;
        breakEvenYears: number;
        visaRisk: string;
    };
}

export function calculateMatchScore(user: UserProfile, uni: UniversityData): MatchScore {
    // Academic Fit (40%)
    let cgpaScore = 0;
    const cgpaDiff = user.cgpa - uni.minimum_cgpa;
    if (cgpaDiff >= 0.5) cgpaScore = 100;
    else if (cgpaDiff >= 0) cgpaScore = 85;
    else if (cgpaDiff >= -0.2) cgpaScore = 70;
    else if (cgpaDiff >= -0.5) cgpaScore = 50;
    else cgpaScore = 30;

    let ieltsScore = 0;
    const ieltsDiff = user.ielts - uni.required_ielts;
    if (ieltsDiff >= 1.0) ieltsScore = 100;
    else if (ieltsDiff >= 0) ieltsScore = 85;
    else if (ieltsDiff >= -0.5) ieltsScore = 60;
    else ieltsScore = 30;

    const academic = Math.round((cgpaScore * 0.5) + (ieltsScore * 0.5));

    // Budget Fit (30%)
    const totalCost = uni.tuition_fee + uni.living_cost;
    const costRatio = totalCost / user.budget;
    let budgetScore = 0;
    if (costRatio <= 0.8) budgetScore = 100;
    else if (costRatio <= 1.0) budgetScore = 85;
    else if (costRatio <= 1.2) budgetScore = 60;
    else budgetScore = 30;

    // ROI Score (20%)
    const breakEvenYears = totalCost / (uni.average_salary || 50000);
    let roiScore = 0;
    if (breakEvenYears <= 1) roiScore = 100;
    else if (breakEvenYears <= 2) roiScore = 85;
    else if (breakEvenYears <= 3) roiScore = 65;
    else roiScore = 40;

    // Visa Risk (10%)
    const visaScores: Record<string, number> = {
        low: 100,
        medium: 70,
        high: 40,
    };
    const visaScore = visaScores[uni.visa_difficulty] || 70;

    // Overall
    const overall = Math.round(
        (academic * 0.4) + (budgetScore * 0.3) + (roiScore * 0.2) + (visaScore * 0.1)
    );

    return {
        overall,
        academic,
        budget: budgetScore,
        roi: roiScore,
        visa: visaScore,
        breakdown: {
            cgpaScore,
            ieltsScore,
            costFit: Math.round((1 - costRatio) * 100),
            breakEvenYears: Math.round(breakEvenYears * 10) / 10,
            visaRisk: uni.visa_difficulty,
        },
    };
}
