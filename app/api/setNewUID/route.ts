import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { uid } = await req.json();
    // Validate input
    if (!uid || typeof uid !== 'number') {
        return NextResponse.json({ error: 'Invalid uid value' }, { status: 400 });
    }

    try {
        // Check if uid already exists
        const existingUID = await prisma.synth.findFirst({
            where: { uid },
        });

        let savedSynth;

        if (existingUID) {
            if (uid > existingUID.uid) {
                savedSynth = await prisma.synth.update({
                    where: { id: existingUID.id },
                    data: { uid, sigma: 0.003, dt: 1, flag: 1 },
                });
            }
        } else {
            // Create new synth entry
            savedSynth = await prisma.synth.create({
                data: { uid, sigma: 0.003, dt: 1, flag: 1 },
            });
        }

        return NextResponse.json({ synth: savedSynth }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
    }
}
