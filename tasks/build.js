const gulp = require('gulp');
const _ = require('lodash');

const clean = require('./clean');
const mergeLocales = require('./locales/locales');
const bundleConfs = require('./bundle-confs');

const build = gulp.series(clean, mergeLocales, bundleConfs, (cb) => {
  const webpack = require('webpack');
  const config = require('./webpack.config')();

  return webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      const statsErrors = _.get(stats, 'toJson') && stats.toJson({ errorStack: true }).errors;
      cb(err || statsErrors[0]);
    }

    process.stdout.write(`${stats.toString(config.stats)}\n`);
    cb();
  });
});

module.exports = build;
