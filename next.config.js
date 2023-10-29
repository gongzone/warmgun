/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "d3tjehezuc3qys.cloudfront.net",
        port: "",
        pathname: "/upload/**",
      },
    ],
  },
}

module.exports = nextConfig
