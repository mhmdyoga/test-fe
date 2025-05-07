import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nkihbopqxauxphmaqvey.supabase.co",
      },
    ],
  }
};

export default nextConfig;
