import prisma from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'
export const revalidate = 0;
export async function GET() {
    const coldkeys = await prisma.coldkey.findMany();
    const data = []
    for (const cold of coldkeys) {
        const { name, coldkey } = cold
        try {
            const result = await axios.post('https://taoxnet.io/api/v1/address/get?network=mainnet', { address: coldkey }, { headers: { "Content-Type": "application/json" } })
            const { staked, free } = result.data
            const returned_data = {
                staked: staked,
                free: free,
                total: staked + free,
                coldkey: coldkey,
                name: name
            }
            data.push(returned_data)
        } catch (error) {
            console.error(error)
        }
    }
    return NextResponse.json(data);
}
