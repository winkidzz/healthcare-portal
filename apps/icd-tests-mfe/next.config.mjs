import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'icd_tests_mfe',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './ICDTests': './src/components/ICDTests.tsx',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true,
            strictVersion: true,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true,
            strictVersion: true,
          },
          'react/jsx-runtime': {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true,
            strictVersion: true,
          },
        },
        extraOptions: {
          automaticAsyncBoundary: true,
          skipSharingNextInternals: true,
        },
      })
    );

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        react: resolve(__dirname, '../../node_modules/react'),
        'react-dom': resolve(__dirname, '../../node_modules/react-dom'),
        '@healthcare-portal/shared-library': resolve(__dirname, '../../packages/shared-library/src'),
      },
    };

    return config;
  },
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
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
};

export default nextConfig; 