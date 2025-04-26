import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'preferences_mfe',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Preferences': {
            import: './src/components/Preferences',
            name: 'preferences_component',
          },
        },
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
          automaticAsyncBoundary: true,
          skipSharingNextInternals: true,
        },
      })
    );

    return config;
  },
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig; 