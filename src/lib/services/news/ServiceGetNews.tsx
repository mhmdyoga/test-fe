import baseApi from "@/components/baseApi/baseApi"


export const getNewsByPagination = async(page: number)=> {
    const response = await baseApi.get(`/articles?page=${page}`)
    return response.data
}

export const getNewsById = async(id: string) => {
    const response = await baseApi.get(`/articles/${id}`)
    return response.data
}

export const getNews = async() => {
    const response = await baseApi.get('/articles')
    return response.data
}

export const getSearchNews = async(query: string) => {
    const response = await baseApi.get(`/articles?title=${query}`)
    return response.data
}