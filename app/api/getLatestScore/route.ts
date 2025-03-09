import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { protein } = await req.json();

        if (!protein || typeof protein !== 'string') {
            return NextResponse.json({ error: 'Invalid protein value' }, { status: 400 });
        }

        const winProtein = await prisma.score.findFirst({
            where: { protein },
            orderBy: { createdAt: 'desc' },
        });

        if (!winProtein) {
            return NextResponse.json({ error: 'No protein found' }, { status: 404 });
        }

        return NextResponse.json(
            { protein: winProtein },
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
        console.error('Error fetching latest score:', error);
        return NextResponse.json({ error: 'Failed to fetch protein' }, { status: 500 });
    }
}
