"use client"
import { fetcher } from "@/utils/fetcher";
import axios from "axios";
import useSWR from 'swr'

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/getAllScore', fetcher);
  const getClick = async () => {
    const response = await axios.get('/api/getLatestProtein')
    console.log("Get Response: ", response.data)
  }

    const getScoreClick = async () => {
    const response = await axios.post('/api/getLatestScore', { protein: "PDSD89D" })
    console.log("Get Score Response: ", response.data)
  }
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong</div>
  if (data) {
    console.log({ data })
    return (
      <div className="mx-5 md:mx-10 flex flex-col gap-2">
        <button onClick={getClick}>Get Latest Protein</button>
        <button onClick={getScoreClick}>Get Latest Score</button>
        <div className="w-full">
          <table className='w-full table-auto'>
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th className='text-center'>Protein</th>
                <th className='text-center'>Score</th>
                <th className='text-center'>Product</th>
              </tr>
            </thead>
            <tbody>
              {
                data && data.protein && data.protein.map((score:any, index:number) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className='text-center'>{score.protein}</td>
                    <td className='text-center'>{score.score}</td>
                    <td className='text-center'>{score.product}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div >
    );
  }
}
