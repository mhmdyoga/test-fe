"use client";
import { getNews, getNewsById, getNewsByPagination, getSearchNews } from "@/lib/services/news/ServiceGetNews";
import { useQuery } from "@tanstack/react-query";

export function useGetNewsByPagination(page: number){
    return useQuery({
            queryKey: ["news", page],
            queryFn: () => getNewsByPagination(page)
         })
}

export function useGetNewsById(id: string) {
    return useQuery({
        queryKey: ["news", id],
        queryFn: () => getNewsById(id)
    })
}

export function useGetNews(){
    return useQuery({
        queryKey: ["news", "all"],
        queryFn: getNews
    })
}

export function useGetSearchNews(query: string) {
    return useQuery({
        queryKey: ["news", query],
        queryFn: () => getSearchNews(query)
    })
}