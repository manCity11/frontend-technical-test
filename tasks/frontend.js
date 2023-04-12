const _ = require('lodash');
const path = require('path');
const gulp = require('gulp');
const express = require('express');
const webpack = require('webpack');
const { exec } = require('child_process');

const { src } = require('./build-config');
const { isE2eTest, options } = require('./env-helper');

const clean = require('./clean');
const mergeLocales = require('./locales/locales');
const bundleConfs = require('./bundle-confs');

const watchersEnabled = !isE2eTest || options.ui;
const copyConf = () => {
  const dist = 'dist';
  return exec(`cp ${path.posix.join(dist, `configs/${options.env}/*`)} ${dist}`);
};

const serve = gulp.series(
  clean,
  gulp.series(mergeLocales, bundleConfs),
  (cb) => {
    const WebpackDevServer = require('webpack-dev-server');
    const config = require('./webpack.config')(true);

    const devServer = {
      compress: true,
      port: 3000,
      static: {
        directory: path.join(__dirname, '../dist'),
        watch: false, // disable reload when locales or conf change before index is rebuilt
      },
      client: {
        overlay: { errors: true, warnings: false, }
      },
      hot: watchersEnabled,
      historyApiFallback: true,
      devMiddleware: {
        writeToDisk(filePath) {
          return /index\.html$/.test(filePath);
        },
      },
      watchFiles: ['./dist/index.html'],
    };

    // used for e2e
    global.compiler = webpack(config);

    const server = new WebpackDevServer(devServer, global.compiler);
    server.start();

    gulp.watch(['app/**/*.i18n'], gulp.series(mergeLocales, bundleConfs, copyConf, () =>  exec(`touch ${src.htmlIndex}`)));
    gulp.watch(['app/config/**/*.js'], gulp.series(bundleConfs, copyConf, () => exec(`touch ${src.htmlIndex}`)));

    return cb();
  },
  copyConf,
);

module.exports = serve;