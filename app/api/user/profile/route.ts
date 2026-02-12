import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { getUser } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const user = await getUser(request);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        return NextResponse.json({ profile: user });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const supabase = getServiceSupabase();
        const user = await getUser(request);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { fullName, cgpa, ielts, budget, preferredCountries, preferredPrograms, workExperienceYears } = body;

        const updates: Record<string, any> = {};
        if (fullName !== undefined) updates.full_name = fullName;
        if (cgpa !== undefined) updates.cgpa = cgpa;
        if (ielts !== undefined) updates.ielts = ielts;
        if (budget !== undefined) updates.budget = budget;
        if (preferredCountries !== undefined) updates.preferred_countries = preferredCountries;
        if (preferredPrograms !== undefined) updates.preferred_programs = preferredPrograms;
        if (workExperienceYears !== undefined) updates.work_experience_years = workExperienceYears;

        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ profile: data, message: 'Profile updated successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
