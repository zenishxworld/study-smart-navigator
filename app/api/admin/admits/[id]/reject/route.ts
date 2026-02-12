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

        const { error } = await supabase
            .from('admits')
            .delete()
            .eq('id', parseInt(params.id));

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ message: 'Admit rejected and removed' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
