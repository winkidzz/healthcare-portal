import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
        name: 'host_app',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          preferences_mfe: `preferences_mfe@${process.env.PREFERENCES_MFE_URL || 'http://localhost:3002'}/_next/static/chunks/remoteEntry.js`,
          icd_tests_mfe: `icd_tests_mfe@${process.env.ICD_TESTS_MFE_URL || 'http://localhost:3001'}/_next/static/chunks/remoteEntry.js`,
        },
        exposes: {
          './pages/index': './src/pages/index.tsx',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: '^18.3.1',
            eager: true,
            strictVersion: true,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^18.3.1',
            eager: true,
            strictVersion: true,
          },
          'react/jsx-runtime': {
            singleton: true,
            requiredVersion: '^18.3.1',
            eager: true,
            strictVersion: true,
          },
          'react/jsx-dev-runtime': {
            singleton: true,
            requiredVersion: '^18.3.1',
            eager: true,
            strictVersion: true,
          },
          'next/dynamic': {
            singleton: true,
            requiredVersion: false,
            eager: true,
            strictVersion: false,
          },
          '@healthcare-portal/shared-library': {
            singleton: true,
            requiredVersion: false,
            eager: true,
          },
        },
        extraOptions: {
          automaticAsyncBoundary: true,
          skipSharingNextInternals: true,
          exposePages: true,
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
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
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
  async rewrites() {
    return [
      {
        source: '/preferences-mfe/_next/static/chunks/:path*',
        destination: 'http://localhost:3002/_next/static/chunks/:path*',
      },
      {
        source: '/icd-tests-mfe/_next/static/chunks/:path*',
        destination: 'http://localhost:3001/_next/static/chunks/:path*',
      },
    ];
  },
};

export default nextConfig; 