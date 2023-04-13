module.exports = (isServedLocally) => {
  const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const { isProd } = require('./env-helper');

  const scss = require('./webpack-loaders/scss-loader')(isServedLocally);
  const css = require('./webpack-loaders/css-loader')(isServedLocally);
  const assets = require('./webpack-loaders/assets-loader')();

  const plugins = [
    new MiniCssExtractPlugin({
      // no hash with css-hot-loader
      filename: `[name]-${isServedLocally ? '[fullhash]' : '[contenthash]'}.css`,
      runtime: false, // otherwise all themes are auto loaded in document due to dynamic import chain
    }),
  ];

  if (isProd) {
    plugins.push(new CssMinimizerPlugin());
  }

  return {
    ...assets,
    scssLoader: scss,
    cssLoader: css,
    plugins,
  };
};
