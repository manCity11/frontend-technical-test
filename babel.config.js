module.exports = (api) => {
  api.cache(true);
  const presets = [
    ['@babel/preset-env', { targets: { chrome: 60, safari: 11 }, corejs: { version: '3.30', proposals: true }, useBuiltIns: 'usage' }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ];

  const plugins = [];

  return {
    presets,
    plugins,
    env: {
      test: {
        plugins: [
          'require-context-hook'
        ],
      },
    },
  };
};
