import path from 'path';

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@redux': path.resolve(process.cwd(), 'redux'),
    };
    return config;
  },
};

export default nextConfig;
