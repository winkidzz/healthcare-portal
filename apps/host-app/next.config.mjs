import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          remotes: {
            preferences_mfe: `preferences_mfe@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
            icdTests: `icdTests@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
          },
          filename: 'static/chunks/remoteEntry.js',
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
              eager: true,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
              eager: true,
            },
            '@healthcare-portal/shared-library': {
              singleton: true,
              requiredVersion: false,
              eager: true,
            },
          },
          extraOptions: {
            skipSharingNextInternals: true,
            automaticAsyncBoundary: true,
            exposePages: true,
            enableUrlLoader: true,
            remoteType: 'var',
          },
        })
      );
    }
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