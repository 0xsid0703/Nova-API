"use client"
import { fetcher } from '@/utils/fetcher'
import React from 'react'
import useSWR from 'swr'
type Props = {
    miners: number[]
}
const Score = ({miners}: Props) => {
    const { data } = useSWR('https://synth.mode.network/validation/scores/latest', fetcher)
    if (data) {
        const scoreSortedData = data.sort((a: any, b: any) => a.prompt_score - b.prompt_score)
        const addedGradeScore = scoreSortedData.map((item: any, index: number) => ({
            ...item,
            grade: index + 1,
        }))

        const filteredData = addedGradeScore.filter((item: any) =>
            miners?.includes(item.miner_uid)
        );
        const top = {
            SNID: 50,
            UID: addedGradeScore[0].miner_uid,
            Score: addedGradeScore[0].prompt_score,
            Grade: addedGradeScore[0].grade,
        }
        return (
            <div className='w-fit rounded-2xl'>
                <div className='flex flex-col gap-5'>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr>
                                <th className='py-1'>UID</th>
                                <th className='py-1'>Score</th>
                                <th className='py-1'>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-center py-1'>{top.UID}</td>
                                <td className='text-center px-10 py-1'>{top.Score}</td>
                                <td className='text-center py-1'>{top.Grade}</td>
                            </tr>
                            {
                                filteredData.map((item: any) => 
                                    <tr>
                                        <td className='text-center cursor-pointer py-1'>{item.miner_uid}</td>
                                        <td className='text-center py-1'>{item.prompt_score}</td>
                                        <td className='text-center py-1'>{item.grade}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Score