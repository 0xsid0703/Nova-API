import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export const revalidate = 0;
export async function GET() {
    try {
        const prisma = (await import('@/lib/prisma')).default; // Dynamic import

        const winProtein = await prisma.score.findMany();

        if (winProtein.length === 0) {
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
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch proteins' }, { status: 500 });
    }
}
