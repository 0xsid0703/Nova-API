'use client'
import React from 'react'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import clsx from 'clsx'

type Props = {
    miner: number
}

const ValidateItem = ({ miner }: Props) => {
    const { data, error, isLoading } = useSWR(`https://synth.mode.network/validation/miner?uid=${miner}`, fetcher)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading data</div>
    if (data) return <div className='flex flex-row gap-2 items-center text-sm'>
        <div className={clsx('rounded-full w-14 h-8 flex items-center justify-center cursor-pointer', data.validated ? 'bg-indigo-500' : 'bg-red-500')}>{miner}</div>
    </div>
}

export default ValidateItem