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
            if (uid === existingUID.uid) {
                savedSynth = await prisma.synth.delete({
                    where: { id: existingUID.id },
                });
            }
        } 

        return NextResponse.json({ synth: savedSynth }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
    }
}
