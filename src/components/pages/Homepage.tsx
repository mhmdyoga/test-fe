"use client"
import { Roboto } from 'next/font/google';
import React, { Suspense, useState } from 'react';
import { Check, ChevronsUpDown, Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from 'next/image';
import Newspage from './Newspage';
import InputSearchpage from './InputSearchpage';

// font
const roboto_font = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
});

const Categories = [
  { value: "tech", label: "Tech" },
  { value: "healt", label: "Healt" },
  { value: "industry", label: "Industry" },
  { value: "finance", label: "Finance" },
];

function Homepage() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <div className="relative bg-blue-500 h-[80vh] flex justify-center items-center">
        {/* Background Image */}
        <Image
          src="/bg-office.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          priority
        />
        
        {/* Hero Content */}
        <div className={cn("relative z-10 text-white text-center px-4", roboto_font.className)}>
          <span className="text-lg md:text-xl font-semibold">Blog Genzet</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            The Journal: Design Resource,<br className="hidden md:block" /> Interviews, and Industry News
          </h2>
          <p className="text-md md:text-lg mt-2">your daily dose of design insight!</p>

          {/* Search Section */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-8">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between bg-white text-black"
                >
                  {value
                    ? Categories.find((category) => category.value === value)?.label
                    : <span>Select Category</span>}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search category..." />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {Categories.map((category) => (
                        <CommandItem
                          key={category.value}
                          value={category.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === category.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {category.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

              <Suspense fallback={<div><Loader2Icon className='w-10 h-10 animate-spin'/></div>}>
                <InputSearchpage/>
              </Suspense>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="p-6 md:p-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Latest Articles</h2>
        <Newspage />
      </div>
    </>
  );
}

export default Homepage;
