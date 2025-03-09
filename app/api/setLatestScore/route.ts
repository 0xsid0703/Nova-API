import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { protein, score, product } = await req.json();
    console.log({ protein, score, product })
    // Validate input
    if (!protein || typeof protein !== 'string' || typeof score !== 'number') {
        return NextResponse.json({ error: 'Invalid protein or score value' }, { status: 400 });
    }

    try {
        // Check if protein already exists
        const existingScore = await prisma.score.findFirst({
            where: { protein },
        });

        let savedScore;

        if (existingScore) {
            if (score > existingScore.score) {
                savedScore = await prisma.score.update({
                    where: { id: existingScore.id },
                    data: { score, product },
                });
            }
        } else {
            // Create new protein entry
            savedScore = await prisma.score.create({
                data: { protein, score, product },
            });
        }

        return NextResponse.json({ score: savedScore }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
    }
}
