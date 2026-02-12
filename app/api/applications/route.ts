import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { getUser } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const supabase = getServiceSupabase();
        const user = await getUser(request);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { data, error } = await supabase
            .from('applications')
            .select(`
                *,
                universities (name, country, city)
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        const applications = (data || []).map(app => ({
            ...app,
            university_name: app.universities?.name,
            country: app.universities?.country,
            city: app.universities?.city,
        }));

        return NextResponse.json({ applications });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const supabase = getServiceSupabase();
        const user = await getUser(request);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { universityId, programId, deadline, notes } = await request.json();

        if (!universityId) {
            return NextResponse.json({ error: 'University ID is required' }, { status: 400 });
        }

        // Check if already tracking this university
        const { data: existing } = await supabase
            .from('applications')
            .select('id')
            .eq('user_id', user.id)
            .eq('university_id', universityId)
            .single();

        if (existing) {
            return NextResponse.json({ error: 'Already tracking this university' }, { status: 409 });
        }

        const { data, error } = await supabase
            .from('applications')
            .insert({
                user_id: user.id,
                university_id: universityId,
                program_id: programId || null,
                deadline: deadline || null,
                notes: notes || null,
            })
            .select(`*, universities (name, country, city)`)
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({
            application: {
                ...data,
                university_name: data.universities?.name,
                country: data.universities?.country,
                city: data.universities?.city,
            },
            message: 'Application tracked successfully',
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
