import axios from "axios";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'
export const revalidate = 0;
export async function GET(req: Request) {
    const url = new URL(req.url); // Create a URL object from the request URL
    const nodeid = url.searchParams.get('nodeid') as string; // Get the 'day' query parameter
    console.log({ nodeid })
    try {
        const rawData = JSON.stringify({ node_id: nodeid });
        const response = await axios.post("http://185.236.232.38:7373/check-node", rawData, { headers: { "Content-Type": "application/json" } });
        const data = await response.data;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message || "Internal Server Error" });
    }
}