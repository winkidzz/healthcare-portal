import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
  },
  webpack(config, { isServer }) {
    // Add rule for shared library TypeScript files
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [resolve(__dirname, '../../packages/shared-library/src')],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript', '@babel/preset-react'],
          },
        },
      ],
    });

    config.plugins.push(
      new NextFederationPlugin({
        name: 'preferences_mfe',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Preferences': './src/components/Preferences',
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

    // Add proper module resolution
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        react: resolve(__dirname, '../../node_modules/react'),
        'react-dom': resolve(__dirname, '../../node_modules/react-dom'),
        '@healthcare-portal/shared-library': resolve(__dirname, '../../packages/shared-library/src'),
        '@': resolve(__dirname, './src'),
      },
      extensionAlias: {
        '.js': ['.js', '.ts', '.tsx'],
        '.jsx': ['.jsx', '.tsx'],
      },
    };

    return config;
  },
  async headers() {
    return [
      {
        source: '/_next/static/chunks/:path*',
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
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig; 