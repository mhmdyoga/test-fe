/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetSearchNews } from '@/lib/hooks/news/hooksGetNews';
import { LoaderPinwheel } from 'lucide-react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';

const SearchNews = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? "";

  const { data: NewsItem, isLoading } = useGetSearchNews(query);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <LoaderPinwheel className='w-10 h-10 animate-spin' />
      </div>
    );
  }

  return (
    <div className='p-4 md:p-8'>
      <h2 className='text-xl font-semibold mb-6'>Hasil Pencarian: <span className="text-blue-500">{query}</span></h2>

      {NewsItem.data.length === 0 ? (
        <div className='flex justify-center items-center min-h-[200px]'>
          <h2 className='text-black font-bold'>No Article Found</h2>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {NewsItem.data.map((news: any) => (
            <Card key={news.id} className="hover:shadow-lg transition duration-300">
              <Link href={`/news/${news.id}`}>
                <Image
                  src={news.imageUrl || '/noimage.png'}
                  alt={news.title}
                  width={400}
                  height={250}
                  className='w-full h-[200px] object-cover rounded-t-md'
                />
                <CardContent className="p-4">
                  <CardDescription className="text-sm text-gray-500 mb-2">
                    {new Date(news.createdAt).toLocaleDateString()}
                  </CardDescription>
                  <CardTitle className="text-lg font-bold line-clamp-2 mb-1">{news.title}</CardTitle>
                  <CardDescription className='text-gray-700 line-clamp-3 text-sm'>{news.content}</CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchNews;
