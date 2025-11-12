/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/database"],
  outputFileTracingRoot: require("path").join(__dirname, "../../"),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.api-sports.io",
        pathname: "/football/**",
      },
    ],
  },
};

export default nextConfig;
