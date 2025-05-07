/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetNewsByPagination } from '@/lib/hooks/news/hooksGetNews';
import Image from 'next/image';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const Newspage = () => {
    const [page, setPage] = useState(1);

    const { data: NewsItem, isLoading } = useGetNewsByPagination(page);

    const handleNextPage = () => {
        if (NewsItem?.page) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loader2 className='h-10 w-10 animate-spin transition-all' />
            </div>
        );
    }

    return (
        <div>
            {NewsItem?.data?.length === 0 ? (
                <div className='flex justify-center items-center h-screen'>
                    <h2 className='font-bold text-black'>No News Posted</h2>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
                    {NewsItem.data.map((news: any) => (
                        <Card key={news.id}>
                            <CardHeader>
                                <span className='text-sm'>{new Date(news.createdAt).toLocaleString()}</span>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-4'>
                              <Link href={`/news/${news.id}`}>
                                <div className='flex justify-center items-center'>
                                    <Image src={news.imageUrl || `/noimage.png`} alt="noimage.png" width={220} height={220} className='w-auto h-auto object-cover' />
                                </div>
                              </Link>
                                <CardTitle>{news.title}</CardTitle>
                                <CardDescription className='line-clamp-2'>{news.content}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <div className='bg-blue-500/25 text-white rounded-full w-auto flex items-center font-bold h-auto p-2'>
                                    <p className='text-blue-500/80'>{news.category?.name}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            <div className='mt-24'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={handlePrevPage} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink isActive>{page}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext onClick={handleNextPage} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default Newspage;
