import { NextConfig } from 'next';
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig: NextConfig = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'icdTests',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './ICDTestsApp': './src/app/icd-tests/page.tsx',
            './TestList': './src/components/TestList.tsx',
            './TestDetails': './src/components/TestDetails.tsx',
          },
          shared: {
            // Shared dependencies
            react: {
              singleton: true,
              requiredVersion: false,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
            },
          },
        })
      );
    }
    return config;
  },
  // Enable experimental features needed for Module Federation
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig; 