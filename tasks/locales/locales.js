/**
 * Merge locales into one json per language
 */
const util = require('util');
const path = require('path');

const { dest } = require('../build-config');
const { LocalesPlugin } = require('./locales-plugin');

module.exports = function locales() {
  const webpack = require('webpack');
  const config = require('../webpack.config')();

  const promisifyWebpack = util.promisify(webpack);

  return promisifyWebpack({
    ...config,
    ...{
      mode: 'development',
      devtool: false,
      plugins: [
        new webpack.IgnorePlugin({
          resourceRegExp: /\.(css|scss|svg|jpg|png|html)$/,
        }),
        new LocalesPlugin(),
      ],
      module: {
        rules: [
          { test: /\.(ts|tsx|js)$/, loader: 'babel-loader' },
          { test: /\.i18n$/, loader: path.resolve(__dirname, './locales-loader'), type: 'json' },
        ],
      },
      optimization: {
        minimize: false,
      },
      output: {
        path: path.resolve(__dirname, '../../.tmp'), // js output is useless but always emitted
      },
    },
  }).then((stats) => {
    const json = stats.toJson({ assets: true, all: false });
    return promisifyWebpack({
      mode: 'production',
      entry: () => {
        const entries = {};
        json.assets.forEach(({ name }) => {
          entries[name.replace('.js', '')] = path.resolve(__dirname, '../../.tmp', name);
        });
        return entries;
      },
      module: {
        rules: [
          { test: /\.js$/ },
        ],
      },
      output: {
        library: {
          name: '__LOCALES__',
          type: 'window',
          export: 'default',
        },
        globalObject: '(typeof window !== \'undefined\' ? window : (typeof self !== \'undefined\' ? self : global))',
        path: dest.locales,
        filename: '[name]-[contenthash].js',
      },
    });
  }).then((stats) => {
    const json = stats.toJson({ assets: true, all: false });
    const assets = json.assets.filter(({ type }) => type === 'asset');
    assets.forEach(({ name, chunkNames }) => {
      const lang = chunkNames[0].split('.')[1];
      global.localesBundle = global.localesBundle || {};
      global.localesBundle[lang] = `locales/${name}`;
    });
  });
};
