import baseApi from "@/components/baseApi/baseApi"

export const profileService = async(token: string) => {
    const response = await baseApi.get(`/auth/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}