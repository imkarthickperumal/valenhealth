import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
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