import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { getUser } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const supabase = getServiceSupabase();
        const user = await getUser(request);
        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }

        const body = await request.json();
        const { data, error } = await supabase.from('universities').insert(body).select().single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ university: data }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
