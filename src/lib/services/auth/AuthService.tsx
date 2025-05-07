import baseApi from "@/components/baseApi/baseApi"

type AuthProps = {
    username?: string;
    password?: string;
    role?: "Admin" | "User"
}

export const LoginService = async(credentials: AuthProps) => {
    const response = await baseApi.post(`/auth/login`, credentials);
    return response.data
}

export const RegisterService = async(credential: AuthProps) => {
    const response = await baseApi.post(`/auth/register`, credential);
    return response.data
}