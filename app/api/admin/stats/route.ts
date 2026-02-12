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

        const [users, universities, applications, admits] = await Promise.all([
            supabase.from('profiles').select('id', { count: 'exact' }),
            supabase.from('universities').select('id', { count: 'exact' }),
            supabase.from('applications').select('id, status', { count: 'exact' }),
            supabase.from('admits').select('id, verified', { count: 'exact' }),
        ]);

        return NextResponse.json({
            stats: {
                totalUsers: users.count || 0,
                totalUniversities: universities.count || 0,
                totalApplications: applications.count || 0,
                totalAdmits: admits.count || 0,
                pendingAdmits: admits.data?.filter(a => !a.verified).length || 0,
                applicationsByStatus: {
                    applied: applications.data?.filter(a => a.status === 'applied').length || 0,
                    under_review: applications.data?.filter(a => a.status === 'under_review').length || 0,
                    admitted: applications.data?.filter(a => a.status === 'admitted').length || 0,
                    rejected: applications.data?.filter(a => a.status === 'rejected').length || 0,
                },
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
