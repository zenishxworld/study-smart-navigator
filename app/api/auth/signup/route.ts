import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
    try {
        const { email, password, fullName, cgpa, ielts, budget, preferredCountries } = await request.json();

        if (!email || !password || !fullName) {
            return NextResponse.json({ error: 'Email, password, and full name are required' }, { status: 400 });
        }

        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: fullName },
        });

        if (authError) {
            if (authError.message.includes('already')) {
                return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
            }
            return NextResponse.json({ error: authError.message }, { status: 400 });
        }

        // Update profile with academic info
        if (authData.user) {
            await supabase.from('profiles').update({
                cgpa: cgpa || null,
                ielts: ielts || null,
                budget: budget || null,
                preferred_countries: preferredCountries || [],
            }).eq('id', authData.user.id);
        }

        return NextResponse.json({
            message: 'Account created successfully',
            user: {
                id: authData.user?.id,
                email: authData.user?.email,
                fullName,
            },
        }, { status: 201 });

    } catch (error: any) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
