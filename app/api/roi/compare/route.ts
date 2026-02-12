// Comparison is handled by the main /api/roi route with mode='compare'
// This file is kept for route compatibility.
import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json(
        { error: 'Use POST /api/roi with mode: "compare" instead' },
        { status: 301 }
    );
}
