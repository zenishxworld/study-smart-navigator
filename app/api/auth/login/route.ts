import { NextResponse } from 'next/server';
import { getSupabase, getServiceSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const supabase = getSupabase();
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Fetch profile
        const serviceClient = getServiceSupabase();
        const { data: profile } = await serviceClient
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        return NextResponse.json({
            message: 'Login successful',
            session: {
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_at: data.session.expires_at,
            },
            user: {
                id: data.user.id,
                email: data.user.email,
                fullName: profile?.full_name || '',
                role: profile?.role || 'user',
                cgpa: profile?.cgpa,
                ielts: profile?.ielts,
                budget: profile?.budget,
            },
        });

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
