import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUser } from '@/lib/auth';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country');
        const universityId = searchParams.get('universityId');
        const admitType = searchParams.get('type');

        let query = supabase
            .from('admits')
            .select(`*, universities (name, country, city)`)
            .eq('verified', true)
            .order('created_at', { ascending: false });

        if (universityId) query = query.eq('university_id', parseInt(universityId));
        if (admitType) query = query.eq('admit_type', admitType);

        const { data, error } = await query;

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        let admits = (data || []).map(a => ({
            ...a,
            university_name: a.universities?.name,
            university_country: a.universities?.country,
        }));

        if (country) {
            admits = admits.filter(a => a.university_country === country);
        }

        return NextResponse.json({ admits });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const user = await getUser(request);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { universityId, program, admitType, cgpa, ielts, gre, workExperience, year } = await request.json();

        if (!universityId || !admitType) {
            return NextResponse.json({ error: 'University and admit type required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('admits')
            .insert({
                user_id: user.id,
                university_id: universityId,
                program: program || null,
                admit_type: admitType,
                cgpa: cgpa || null,
                ielts: ielts || null,
                gre: gre || null,
                work_experience: workExperience || 0,
                year: year || new Date().getFullYear(),
                verified: false,
            })
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ admit: data, message: 'Admit data submitted for verification' }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
