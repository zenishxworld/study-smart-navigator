// Admits are now uploaded via the main /api/admits POST route.
// This file is kept only for route compatibility.

import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json(
        { error: 'Use POST /api/admits instead' },
        { status: 301 }
    );
}
