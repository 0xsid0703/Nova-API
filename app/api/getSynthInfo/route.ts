import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export const revalidate = 0;
export async function POST(req: Request) {
    try {
        const { uid } = await req.json();
        console.log({ uid })
        const synth = await prisma.synth.findFirst({
            where: { uid },
            orderBy: { createdAt: 'desc' },
        });

        if (!synth) {
            return NextResponse.json({ error: 'No synth found' }, { status: 404 });
        }

        return NextResponse.json(
            { synth: synth },
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
        console.error('Error fetching synth info:', error);
        return NextResponse.json({ error: 'Failed to fetch synth info' }, { status: 500 });
    }
}
