module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        node: 'current',
      },
    }],
    ['@babel/preset-react', {
      runtime: 'automatic',
      importSource: 'react',
    }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      regenerator: true,
    }],
  ],
}; 