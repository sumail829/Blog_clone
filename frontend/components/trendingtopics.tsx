import React from 'react'
import { Button } from './ui/button'

const trendingData = [{
    title: "Technology"
},
{
    title: "Travel"
},
{
    title: "sports"
}]


export default function TrendingTopics() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-4 my-10">
                <h2 className="text-lg font-semibold">Trending Topics</h2>
                <div className='flex gap-5'>
                    {trendingData.map((trending, index) => (
                        <Button variant="outline" className='rounded-sm' key={index}> {trending.title}</Button>))}
                </div>

            </div>
        </div>
    )
}
