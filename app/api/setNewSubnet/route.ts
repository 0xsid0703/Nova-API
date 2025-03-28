import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { net } = await req.json();
    // Validate input
    if (!net || typeof net !== 'number') {
        return NextResponse.json({ error: 'Invalid net value' }, { status: 400 });
    }

    try {
        // Check if net already exists
        const existingNet = await prisma.subnets.findFirst({
            where: { subnet: net },
        });

        let savedSubnet;

        if (existingNet) {
            return NextResponse.json({ subnet: existingNet }, { status: 409 });
        } else {
            // Create new subnet entry
            savedSubnet = await prisma.subnets.create({
                data: { subnet: net },
            });
        }

        return NextResponse.json({ subnet: savedSubnet }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save subnet' }, { status: 500 });
    }
}
