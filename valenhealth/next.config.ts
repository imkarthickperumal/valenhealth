import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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