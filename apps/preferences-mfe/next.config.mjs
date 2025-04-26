import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'preferences_mfe',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './components/Preferences': './src/components/Preferences.tsx',
          './contexts/PreferencesContext': './src/contexts/PreferencesContext.tsx'
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
          skipSharingNextInternals: true,
          automaticAsyncBoundary: true,
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