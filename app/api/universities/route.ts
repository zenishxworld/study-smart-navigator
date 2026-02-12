import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUser } from '@/lib/auth';
import { calculateMatchScore } from '@/lib/scoring';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country');
        const maxCost = searchParams.get('maxCost');
        const minRanking = searchParams.get('minRanking');
        const search = searchParams.get('search');

        let query = supabase.from('universities').select('*');

        if (country) query = query.eq('country', country);
        if (minRanking) query = query.lte('ranking', parseInt(minRanking));
        if (search) query = query.ilike('name', `%${search}%`);

        query = query.order('ranking', { ascending: true, nullsFirst: false });

        const { data: universities, error } = await query;

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        let filtered = universities || [];

        // Filter by max cost (tuition + living)
        if (maxCost) {
            const max = parseInt(maxCost);
            filtered = filtered.filter(u => (u.tuition_fee + u.living_cost) <= max);
        }

        // Calculate match scores if user is logged in
        const user = await getUser(request);
        if (user?.cgpa && user?.ielts && user?.budget) {
            filtered = filtered.map(uni => ({
                ...uni,
                matchScore: calculateMatchScore(
                    { cgpa: user.cgpa, ielts: user.ielts, budget: user.budget },
                    {
                        minimum_cgpa: uni.minimum_cgpa,
                        required_ielts: uni.required_ielts,
                        tuition_fee: uni.tuition_fee,
                        living_cost: uni.living_cost,
                        average_salary: uni.average_salary,
                        visa_difficulty: uni.visa_difficulty,
                    }
                ),
            }));

            // Sort by match score if user is logged in
            filtered.sort((a, b) => (b.matchScore?.overall || 0) - (a.matchScore?.overall || 0));
        }

        return NextResponse.json({ universities: filtered });
    } catch (error: any) {
        console.error('Universities error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
