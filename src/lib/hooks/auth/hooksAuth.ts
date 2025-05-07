import { LoginService, RegisterService } from "@/lib/services/auth/AuthService";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
    return useMutation({
        mutationFn: LoginService
    })
}

export function useRegister() {
    return useMutation({
        mutationFn: RegisterService
    })
}