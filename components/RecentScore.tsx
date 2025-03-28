"use client"
import { fetcher } from '@/utils/fetcher'
import React from 'react'
import useSWR from 'swr'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

type Props = {
    selectedDay: number,
    mm: string
}

const RecentScore = ({ selectedDay, mm }: Props) => {
    const { data } = useSWR(`/api/getScores?day=${selectedDay}&miners=${mm}`, fetcher)

    if (data) {
        console.log(data)
        const labels = data[0].Date
        const dataset = data.map((item: any) => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const borderalpha = 0.5;
            const bgalpha = 0.9;

            return {
                label: `Miner ${item.UID}`,
                data: item.Score,
                borderColor: `rgba(${r}, ${g}, ${b}, ${borderalpha})`,
                backgroundColor: `rgba(${r}, ${g}, ${b}, ${bgalpha})`,
            }
        })
        const line = {
            labels,
            datasets: dataset
        }
        return (
            <div className='w-full'><Line options={options} data={line} /></div>
        )
    }
}

export default RecentScore