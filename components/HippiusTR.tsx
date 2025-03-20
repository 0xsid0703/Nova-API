'use client'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

type Props = {
    coldkey: string;
    hotkey: string;
    node_id: string;
    uid: string
}

const HippiusTR = ({ coldkey, hotkey, node_id, uid }: Props) => {
    const { data, error, isLoading } = useSWR(`/api/getStatusHippius?nodeid=${node_id}`, fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 20000
    })

    const copyKey = (key: string) => {
        navigator.clipboard.writeText(key)
    }
    const showKey = (key: string) => {
        return key.slice(0, 4) + '***' + key.slice(-4)
    }
    return <>
        <tr>
            <td className='text-center py-1'>{uid}</td>
            <td className='text-center py-1' onClick={() => copyKey(coldkey)}>{showKey(coldkey)}</td>
            <td className='text-center py-1' onClick={() => copyKey(hotkey)}>{showKey(hotkey)}</td>
            <td className='text-center py-1' onClick={() => copyKey(node_id)}>{showKey(node_id)}</td>
            <td className='text-center py-1'>{isLoading ? "Loading..." : (data == null ? "Offline" : data.status)}</td>
            <td className='text-center py-1'>
                <button className='bg-red-500 text-white px-2 py-1 rounded-md'>
                    Register
                </button>
            </td>
        </tr>
    </>
}

export default HippiusTR