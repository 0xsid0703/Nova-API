import { NextResponse } from 'next/server';

export async function GET() {
    const prisma = (await import('@/lib/prisma')).default;
    try {
        const winProtein = await prisma.score.findMany();

        if (!winProtein) {
            return NextResponse.json({ error: 'No protein found' }, { status: 404 });
        }

        // ✅ You MUST return here
        return NextResponse.json({ protein: winProtein }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save protein' }, { status: 500 });
    }
}
