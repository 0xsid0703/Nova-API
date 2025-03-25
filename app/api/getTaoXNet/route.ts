import { NextResponse } from 'next/server';
import axios from 'axios';
export const dynamic = 'force-dynamic'
export const revalidate = 0;
export async function GET() {
    try {
        const response = await axios.get(`https://taomarketcap.com/api/subnets/68/metagraph`);
        const res = response.data
        return NextResponse.json({ res }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save protein' }, { status: 500 });
    }
}
