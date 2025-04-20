import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          preferences: 'preferences@http://localhost:3001/_next/static/chunks/remoteEntry.js',
          icdTests: 'icdTests@http://localhost:3002/_next/static/chunks/remoteEntry.js',
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
      })
    );

    return config;
  },
};

export default nextConfig; 