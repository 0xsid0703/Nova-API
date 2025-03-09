import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { protein } = await req.json();
    if (!protein || typeof protein !== 'string') {
        return NextResponse.json({ error: 'Invalid protein value' }, { status: 400 });
    }

    try {
        const savedProtein = await prisma.protein.create({
            data: { protein },
        });

        await prisma.$transaction([]);

        // ✅ You MUST return here
        return NextResponse.json({ protein: savedProtein }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save protein' }, { status: 500 });
    }
}
