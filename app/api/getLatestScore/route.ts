import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { protein } = await req.json();

    if (!protein || typeof protein !== 'string') {
        return NextResponse.json({ error: 'Invalid protein value' }, { status: 400 });
    }

    try {
        const winProtein = await prisma.score.findFirst({
            where: { protein },
            orderBy: { createdAt: 'desc' },
        });

        if (!winProtein) {
            return NextResponse.json({ error: 'No protein found' }, { status: 404 });
        }

        // ✅ You MUST return here
        return NextResponse.json({ protein: winProtein }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save protein' }, { status: 500 });
    }
}
