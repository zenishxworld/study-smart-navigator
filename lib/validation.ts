import { z } from 'zod';

/**
 * Validation schemas for API requests
 */

export const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    fullName: z.string().min(2, 'Full name is required'),
    cgpa: z.number().min(0).max(4).optional(),
    ielts: z.number().min(0).max(9).optional(),
    budget: z.number().min(0).optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
    fullName: z.string().min(2).optional(),
    cgpa: z.number().min(0).max(4).optional(),
    ielts: z.number().min(0).max(9).optional(),
    budget: z.number().min(0).optional(),
    preferredCountries: z.array(z.string()).optional(),
});

export const universitySchema = z.object({
    name: z.string().min(1, 'University name is required'),
    country: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),
    ranking: z.number().optional(),
    tuitionFee: z.number().min(0, 'Tuition fee must be positive'),
    livingCost: z.number().min(0, 'Living cost must be positive'),
    minimumCgpa: z.number().min(0).max(4),
    requiredIelts: z.number().min(0).max(9),
    estimatedSalary: z.number().min(0),
    visaRiskLevel: z.enum(['low', 'medium', 'high']),
    scholarshipAvailable: z.boolean(),
    employmentRate: z.number().min(0).max(100),
    description: z.string().optional(),
    websiteUrl: z.string().url().optional(),
});

export const applicationSchema = z.object({
    universityId: z.number(),
    programId: z.number().optional(),
    status: z.enum(['applied', 'under_review', 'interview', 'admitted', 'rejected']),
    deadline: z.string().optional(),
    notes: z.string().optional(),
});

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Validate file upload
 */
export function validateFileUpload(file: Express.Multer.File): { valid: boolean; error?: string } {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
        return { valid: false, error: 'Invalid file type. Only JPEG, PNG, and PDF allowed.' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File too large. Maximum size is 5MB.' };
    }

    return { valid: true };
}
