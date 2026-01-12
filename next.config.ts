import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // Auméntalo a lo que necesites (ej. 5mb o 10mb)
    },
  },
  /* config options here */
};

export default nextConfig;
