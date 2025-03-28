"use client"
import { fetcher } from '@/utils/fetcher'
import React from 'react'
import useSWR from 'swr'
import ImageLoadingSpinner from './ImageLoadingSpinner'

const Price = () => {
    const { data, error, isLoading } = useSWR('/api/getPrice', fetcher)
    if (isLoading) return <div className='w-full h-full'>
        <ImageLoadingSpinner />
    </div>
    if (error) return <div className='w-full h-full flex flex-col gap-3 items-center justify-center'>
        <img src="/mark.png" className='w-32 h-24' alt='' />
        Data Fetching Error
    </div>
    if (data) {
        const taoPrice = data.find((price: { symbol: string; }) => price.symbol === 'TAOUSDT').price
        const btcPrice = data.find((price: { symbol: string; }) => price.symbol === 'BTCUSDT').price
        return (
            <div className='w-full flex flex-row gap-5 justify-center items-center'>
                <span>BTC: ${btcPrice}</span>
                <span>TAO: ${taoPrice}</span>
            </div>
        )
    }
}

export default Price