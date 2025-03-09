// pages/api/getLatestProtein.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const latestProtein = await prisma.protein.findFirst({
            orderBy: { createdAt: 'desc' },
        });

        if (!latestProtein) {
            return NextResponse.json({ error: 'No protein found' }, { status: 404 });
        }

        return NextResponse.json({ protein: latestProtein });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch protein' }, { status: 500 });
    }
}
