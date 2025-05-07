/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetNews, useGetNewsById } from '@/lib/hooks/news/hooksGetNews';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React from 'react';
import { Card, CardContent } from "@/components/ui/card"


const DetaisNews = () => {
    const params = useParams()
    const id = params.id as string

    const { data: NewsItem, isLoading: detailsNewsLoad } = useGetNewsById(id);
    const { data: AllNews } = useGetNews();
    console.log(AllNews);

    const otherNews = AllNews?.data?.filter((item: any) => item.id !== NewsItem?.id).slice(0, 3);
    console.log(otherNews)

    if (detailsNewsLoad) {
        return <div className='flex justify-center items-center h-screen'><LoaderCircle className='w-10 h-10 animate-spin' /></div>
    }
    return (
        <>
            <div className='flex flex-col gap-6 justify-center items-center p-24'>
                <div className='flex flex-row gap-6'>
                    <span className='font-semibold text-gray-400'>{new Date(NewsItem.createdAt).toLocaleDateString()}</span>
                    <span>CreatedBy: {NewsItem.user.role}</span>
                </div>
                <h2 className='font-bold text-black text-4xl'>{NewsItem.title}</h2>
                <Image src={NewsItem.imageUrl || '/noimage.png'} alt='png' width={450} height={450} className='h-auto w-auto object-cover rounded-md' />
                <h2 className='font-semibold text-lg text-gray-400'>{NewsItem.content}</h2>
            </div>
            <div className='p-6'>
                <h2 className='font-bold text-black text-2xl'>Other Articles</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {otherNews?.map((news: any) => (
                    <div key={news.id} className="p-1">
                        <Card>
                            <CardContent className="flex flex-col gap-4 aspect-square p-6">
                                <Image src={news.imageUrl || '/noimage.png'} alt="" width={450} height={450} className='w-auto h-auto object-cover rounded-md' />
                                <div className='flex flex-col gap-2 items-start text-start'>
                                    <span>{new Date(news.createdAt).toLocaleDateString()}</span>
                                    <h2 className='font-semibold text-black text-2xl text-start'>{news.title}</h2>
                                    <h3 className='line-clamp-2'>{news.content}</h3>
                                    <div className='text-start bg-blue-500/25 rounded-full w-auto flex items-center font-bold h-auto p-2 mt-12'>
                                        <span className='text-blue-500'>{news.category?.name}</span>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default DetaisNews