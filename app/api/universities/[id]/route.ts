import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUser } from '@/lib/auth';
import { calculateMatchScore } from '@/lib/scoring';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);

        const { data: university, error } = await supabase
            .from('universities')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !university) {
            return NextResponse.json({ error: 'University not found' }, { status: 404 });
        }

        // Get programs
        const { data: programs } = await supabase
            .from('programs')
            .select('*')
            .eq('university_id', id);

        // Get verified admits stats
        const { data: admits } = await supabase
            .from('admits')
            .select('*')
            .eq('university_id', id)
            .eq('verified', true);

        const admitStats = {
            total: admits?.length || 0,
            admitted: admits?.filter(a => a.admit_type === 'admit').length || 0,
            rejected: admits?.filter(a => a.admit_type === 'reject').length || 0,
            avgCgpa: admits?.length
                ? Math.round((admits.reduce((s, a) => s + (a.cgpa || 0), 0) / admits.length) * 100) / 100
                : null,
            avgIelts: admits?.length
                ? Math.round((admits.reduce((s, a) => s + (a.ielts || 0), 0) / admits.length) * 10) / 10
                : null,
        };

        // Calculate match score if user is logged in
        let matchScore = null;
        const user = await getUser(request);
        if (user?.cgpa && user?.ielts && user?.budget) {
            matchScore = calculateMatchScore(
                { cgpa: user.cgpa, ielts: user.ielts, budget: user.budget },
                {
                    minimum_cgpa: university.minimum_cgpa,
                    required_ielts: university.required_ielts,
                    tuition_fee: university.tuition_fee,
                    living_cost: university.living_cost,
                    average_salary: university.average_salary,
                    visa_difficulty: university.visa_difficulty,
                }
            );
        }

        return NextResponse.json({
            university: {
                ...university,
                programs: programs || [],
                admitStats,
                matchScore,
            },
        });
    } catch (error: any) {
        console.error('University detail error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
