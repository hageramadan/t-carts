import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //  output: 'export',
  images:{
      qualities: [70 ,75,85, 90, 100],
       unoptimized: true,
  }
};

export default nextConfig;
