import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { getUser } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const supabase = getServiceSupabase();
        const user = await getUser(request);
        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }

        const { data, error } = await supabase
            .from('admits')
            .select(`*, universities (name, country, city)`)
            .eq('verified', false)
            .order('created_at', { ascending: false });

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({
            admits: (data || []).map(a => ({
                ...a,
                university_name: a.universities?.name,
                university_country: a.universities?.country,
            })),
        });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
