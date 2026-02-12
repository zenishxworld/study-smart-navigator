import { NextResponse } from 'next/server';
import { calculateROI, compareROI } from '@/lib/roi';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { mode } = body;

        if (mode === 'compare') {
            const { universityA, universityB } = body;
            if (!universityA || !universityB) {
                return NextResponse.json({ error: 'Two universities required for comparison' }, { status: 400 });
            }
            const result = compareROI(universityA, universityB);
            return NextResponse.json(result);
        }

        // Single university ROI
        const result = calculateROI(body);
        return NextResponse.json({ roi: result });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
