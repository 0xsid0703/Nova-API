import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0;

export async function GET() {
    try {
        const latestProtein = await prisma.protein.findFirst({
            orderBy: { createdAt: 'desc' },  // Ensure ordering is correct
        });

        if (!latestProtein) {
            return NextResponse.json({ error: 'No protein found' }, { status: 404 });
        }

        return NextResponse.json(
            { protein: latestProtein },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                    'Surrogate-Control': 'no-store',
                },
            }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch protein' }, { status: 500 });
    }
}
