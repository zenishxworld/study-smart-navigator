import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { getUser } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const supabase = getServiceSupabase();
        const user = await getUser(request);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const id = parseInt(params.id);
        const { status, notes, deadline } = await request.json();

        const updates: Record<string, any> = {};
        if (status) updates.status = status;
        if (notes !== undefined) updates.notes = notes;
        if (deadline !== undefined) updates.deadline = deadline;

        const { data, error } = await supabase
            .from('applications')
            .update(updates)
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

        return NextResponse.json({ application: data, message: 'Application updated' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const supabase = getServiceSupabase();
        const user = await getUser(request);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const id = parseInt(params.id);

        const { error } = await supabase
            .from('applications')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (error) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

        return NextResponse.json({ message: 'Application removed' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
