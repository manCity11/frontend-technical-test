const webpack = require('webpack');
const path = require('path');
const webpackPreProcessor = require('@cypress/webpack-preprocessor');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const getCompareSnapshotsPlugin = require('./compare-snapshot-plugin');
const { root } = require('../../config');

module.exports = (on, config) => {
  const options = {
    webpackOptions: {
      module: {
        rules: [
          { test: /\.(i18n|css|svg)$/, loader: 'ignore-loader' },
          {
            test: /\.(tsx?|jsx?)$/,
            use: ['babel-loader'],
            exclude: [/node_modules/],
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'], // enables to leave off the extension when importing
        alias: {
          e2e: `${root}`, // required webpack casting to string
          models: `${root}/models/`,
          MAIN_CONFIG: path.resolve(__dirname, './main-config.stub'),
        },
        // no more node polyfills: https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-nodejs-polyfills-removed
        fallback: {
          path: require.resolve('path-browserify'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          _: 'lodash',
        }),
        new NodePolyfillPlugin(),
      ],
    },
  };

  on('file:preprocessor', webpackPreProcessor(options));
  on('task', getCompareSnapshotsPlugin(config));

  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome') {
      // `args` is an array of all the arguments
      // that will be passed to Chrome when it launches
      launchOptions.args.push('--disable-spell-checking');
      launchOptions.args.push('--window-size=1920,1080');
      launchOptions.args.push('--force-device-scale-factor=1');
    }
    // whatever you return here becomes the new args
    return launchOptions;
  });
};
