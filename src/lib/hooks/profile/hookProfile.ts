"use client";
import { profileService } from "@/lib/services/profile/profileService";
import { useQuery } from "@tanstack/react-query";

export function useGetProfile(token: string) {
    return useQuery({
        queryKey: ["profile", token],
        queryFn: () => profileService(token)
    })
}