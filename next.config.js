/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your existing config ...
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [{ module: /node_modules\/punycode/ }];
    return config;
  },
};

module.exports = nextConfig;
