"use client";
import { Roboto } from "next/font/google";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";



// font
const roboto_font = Roboto({
  weight: ["400", "600"],
  subsets: ["latin"],
});

function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth/sign-in')
  }

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h2
              className={clsx(
                "font-bold text-lg md:text-xl transition-colors duration-300",
                roboto_font.className,
                scrolled ? "text-black" : "text-white"
              )}
            >
              LogoIpsum
            </h2>
          </div>

          {/* Tombol Sign-in */}
          <div className="flex items-center">
            {username === "" ? (
               <Button
              variant={scrolled ? "default" : "outline"}
              className={clsx(scrolled ? "bg-black text-white" : "")}
              onClick={() => router.push("/auth/sign-in")}
            >
              Sign-in
            </Button>
            ): (
              <div>
                <DropdownMenu>
                <DropdownMenuTrigger>
                <h2 className={clsx(
                "font-bold text-lg md:text-xl transition-colors duration-300",
                roboto_font.className,
                scrolled ? "text-black" : "text-white"
              )}>{username}</h2>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button variant={'destructive'} onClick={handleLogout} className="w-full flex flex-row gap-2 items-center">
                      <LogOut className="w-10 text-white font-bold h-10"/>
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
            )}
           
          </div>

        </div>
      </div>
    </div>
  );
}

export default Navbar;
