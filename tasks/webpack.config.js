module.exports = (isServedLocally) => {
  const webpack = require('webpack');
  const path = require('path');
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

  const { src, dest, stats } = require('./build-config');
  const { isProd, options } = require('./env-helper');

  const stylesConfig = require('./webpack.styles')(isServedLocally);
  const indexHtml = require('./webpack-loaders/indexHtml')(isServedLocally);

  const config = {
    target: ['web', 'es6'],
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    stats,
    entry: src.entries,
    watchOptions: {
      ignored: /\.i18n$/,
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          styles: {
            test: /\.(css|scss)$/,
            name: dest.styleFileName,
            enforce: true,
            priority: 10,
            type: isServedLocally ? 'javascript/auto' : 'css/mini-extract', // remove empty js file
          },
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        { test: /\.i18n$/, loader: 'ignore-loader' },
        {
          test: /\.(ts|tsx|js)$/,
          include: [src.appPath],
          use: [{ loader: 'babel-loader' }],
        },
        stylesConfig.scssLoader,
        stylesConfig.cssLoader,
        stylesConfig.fontsLoader,
        stylesConfig.imagesLoader,
        {
          test: /\.ejs/,
          loader: 'ejs-loader',
          options: {
            esModule: false,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'], // enables to leave off the extension when importing
      alias: {
        MAIN_CONFIG: `${src.appPath}/src/config.js`,
        src: `${src.appPath}/src`,
        commons: `${src.commonsPath}/`,
        assets: `${src.appPath}/assets`,
      },
    },
    plugins: [
      ...stylesConfig.plugins,
      ...indexHtml,

      new webpack.ProvidePlugin({
        _: [path.resolve(__dirname, './lodash.js'), 'default'],
      }),
    ],
  };

  if (options.analyze) {
    config.plugins = config.plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
    ]);
  }

  return {
    ...config,
    output: {
      // filename is used as regex to create manifest in ejs
      filename: `[name]-${isServedLocally ? '[fullhash]' : '[contenthash]'}.js`, // hash needed for HMR
      publicPath: '/',
      path: dest.distPath,
    },
  };
};
