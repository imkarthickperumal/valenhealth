import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [65, 75, 100],
  },
  async redirects() {
    return [
      {
        source: "/membership",
        destination: "/gym#memberships",
        permanent: true,
      },
      {
        source: "/memberships",
        destination: "/gym#memberships",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;