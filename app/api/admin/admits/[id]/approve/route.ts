import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { getUser } from '@/lib/auth';

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const supabase = getServiceSupabase();
        const user = await getUser(request);
        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }

        const { data, error } = await supabase
            .from('admits')
            .update({ verified: true })
            .eq('id', parseInt(params.id))
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ admit: data, message: 'Admit approved' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
