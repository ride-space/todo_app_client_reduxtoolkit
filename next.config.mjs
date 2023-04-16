import withBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const bundleAnalyzer = withBundleAnalyzer(
  process.env.ANALYZE === 'true'
    ? {
        enabled: true,
      }
    : (config) => {
        return config;
      },
);
const nextConfig = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  poweredByHeader: false,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
};

// export default nextConfig;
export default bundleAnalyzer(nextConfig);
