import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { uid, sigma, dt, flag } = await req.json();
    // Validate input
    if (!uid || typeof uid !== 'number' || typeof sigma !== 'number' || typeof dt !== 'number' || typeof flag !== 'number') {
        return NextResponse.json({ error: 'Invalid uid or value' }, { status: 400 });
    }

    try {
        // Check if protein already exists
        const existingScore = await prisma.synth.findFirst({
            where: { uid },
        });

        let savedScore;

        if (existingScore) {
            savedScore = await prisma.synth.update({
                where: { id: existingScore.id },
                data: { sigma, dt, flag },
            });
        } else {
            // Create new protein entry
            savedScore = await prisma.synth.create({
                data: { uid, sigma, dt, flag },
            });
        }

        return NextResponse.json({ synth: savedScore }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save synth' }, { status: 500 });
    }
}
