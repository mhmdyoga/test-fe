"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useRouter, useSearchParams } from 'next/navigation';

function InputSearchpage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    const existing = searchParams.get("q");
    if (existing && value === "") {
      setValue(existing);
    }
  }, [searchParams, value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value.trim()) {
        router.push(`/news/search/?q=${encodeURIComponent(value.trim())}`);
      }
    }, 500); // debounce time

    return () => clearTimeout(handler); // clear previous timeout on value change
  }, [value, router]);

  return (
    <Input 
      type="text"
      placeholder="Search..."
      className="bg-white text-gray-700 w-[200px]"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default InputSearchpage;
