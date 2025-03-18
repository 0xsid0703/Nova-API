import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    const { hotkey } = await req.json();
    if (!hotkey || typeof hotkey !== 'string') {
        return NextResponse.json({ error: 'Invalid hotkey value' }, { status: 400 });
    }
    // {
    //     "id": 163956752,
    //     "blockNumber": 5119923,
    //     "index": 10,
    //     "signer": "5EbzMy8VTfaQhivXh9RLioK7vNEf5EvFhwiDZgbwcLcqgEyk",
    //     "timestamp": "2025-03-13T14:58:12.000Z",
    //     "result": true,
    //     "method": "commitments.setCommitment"
    // },
    try {
        const response = await axios.post(`https://taoxnet.io/api/v1/extrinsic/address?network=mainnet`, { address: hotkey, skip: 0, take: 10 });
        const res = response.data.data
        console.log({ res })
        const resSlice = res.slice(0, 10)
        const resMap = resSlice.map(async (item: any) => {
            console.log("Hash: ", `${item.blockNumber}-${item.index}`)
            const ress = await axios.post(`https://taoxnet.io/api/v1/extrinsic/item?network=mainnet`, { hash: `${item.blockNumber}-00${item.index}` })
            console.log("Data: ", ress.data.args)
            return { commit: ress.data.args.info.fields[0].Raw41, status: item.result }
        })
        const resMapResult = await Promise.all(resMap)
        return NextResponse.json({ res: resMapResult }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save protein' }, { status: 500 });
    }
}
