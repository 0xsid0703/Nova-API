// pages/api/getLatestProtein.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const prisma = (await import('@/lib/prisma')).default;
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
