import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host_app',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          preferences_mfe: `preferences_mfe@${process.env.PREFERENCES_MFE_URL || 'http://localhost:3002'}/_next/static/chunks/remoteEntry.js`,
          icd_tests_mfe: `icd_tests_mfe@${process.env.ICD_TESTS_MFE_URL || 'http://localhost:3001'}/_next/static/chunks/remoteEntry.js`,
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
        },
        extraOptions: {
          automaticAsyncBoundary: true,
        },
      })
    );
    return config;
  },
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: ['@healthcare-portal/shared-library'],
  async headers() {
    return [
      {
        source: '/_next/static/chunks/remoteEntry.js',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/_next/static/chunks/remoteEntry.js',
        destination: 'http://localhost:3002/_next/static/chunks/remoteEntry.js',
      },
      {
        source: '/_next/static/chunks/:path*',
        destination: 'http://localhost:3002/_next/static/chunks/:path*',
      },
    ];
  },
};

export default nextConfig; 