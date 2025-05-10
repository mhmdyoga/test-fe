/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useLogin } from '@/lib/hooks/auth/hooksAuth';
import { LoginSchema, LoginSchemaType } from '@/lib/schema/auth/AuthSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

const Loginpage = () => {
  const {
    register: loginRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter()

  const { mutate: loginUser, isLoading } = useLogin();

  const onSubmit = (data: LoginSchemaType) => {
    loginUser(data, {
      onSuccess: (res) => {
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", res.role);
        localStorage.setItem("token", res.token)
        router.push('/')
      },
      onError: (err: unknown) => {
        toast("Error",{
          className: "bg-red-500 text-white",
          description: (err as any).response.data.error,
          duration: 9000,
        })
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">LogoIpsum</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                placeholder="Username"
                {...loginRegister("username")}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                {...loginRegister("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-8">
            <h2 className='text-blue-500 italic'>{`Don't have an Account?`} <Link href="/auth/sign-up">Sign-up</Link></h2>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loginpage;
