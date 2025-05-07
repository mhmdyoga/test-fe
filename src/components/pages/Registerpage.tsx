"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRegister } from "@/lib/hooks/auth/hooksAuth";
import { RegisterSchema, RegisterSchemaType } from "@/lib/schema/auth/AuthSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";

const rolesUser = [
    {
        label: "User",
        value: "User"
    },
    {
        label: "Admin",
        value: "Admin"
    }
]

const RegisterPage = () => {
  const [open, setOpen] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter();

  const selectedRole = watch("role");

  const { mutate: registerUser, isLoading } = useRegister();

  const onSubmit = (data: RegisterSchemaType) => {
    registerUser(data, {
      onSuccess: (res) => {
        localStorage.setItem("username", res.username);
        router.push('/auth/sign-in')
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
            <Input placeholder="Username" {...formRegister("username")} />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}

            <Input type="password" placeholder="Password" {...formRegister("password")} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

            {/* Role Picker */}
            <div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {selectedRole ? selectedRole : "Select role"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search role..." />
                    <CommandList>
                      <CommandEmpty>No role found.</CommandEmpty>
                      <CommandGroup>
                        {rolesUser.map((role) => (
                          <CommandItem
                            key={role.value}
                            onSelect={() => {
                              setValue("role", role.value as "Admin" | "User");
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedRole === role.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {role.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader className="w-10 h-10 animate-spin"/> : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
            <h2>Already have an Account ? <Link href="/auth/sign-in">Login</Link></h2>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
