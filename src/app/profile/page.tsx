"use client";
import { Button } from '@/components/ui/button';
import { useGetProfile } from '@/lib/hooks/profile/hookProfile';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [token, setToken] = useState('');
  const storageToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (storageToken) {
      setToken(storageToken);
    }
  }, [storageToken]);

  const { data: profile, isLoading } = useGetProfile(token);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Profile</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <div className="flex flex-row justify-between items-center text-white font-bold bg-gray-500 rounded-lg p-3 shadow-md">
          <h4 className="text-sm md:text-base">Username:</h4>
          <h2 className="text-sm md:text-base break-all">{profile.username}</h2>
        </div>
        <div className="flex flex-row justify-between items-center text-white font-bold bg-gray-500 rounded-lg p-3 shadow-md">
          <h4 className="text-sm md:text-base">Role:</h4>
          <h2 className="text-sm md:text-base">{profile.role}</h2>
        </div>
        <Button
          variant="outline"
          onClick={() => (window.location.href = '/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg p-3 transition-colors"
        >
          Back To Homepage
        </Button>
      </div>
    </div>
  );
};

export default Profile;
