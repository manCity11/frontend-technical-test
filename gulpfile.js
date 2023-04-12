const gulp = require('gulp');

require('@babel/register')({
  ignore: [/node_modules/],
});

const e2e = require('./tasks/e2e');
const build = require('./tasks/build');
const test = require('./tasks/tests/test');
const serveBack = require('./tasks/backend/backend');
const serveFront = require('./tasks/frontend');
const { stylesLint, scriptsLint } = require('./tasks/lint');

exports.e2e = e2e;
exports.test = test;
exports.build = build;
exports.serve = gulp.parallel([serveFront, serveBack]);
exports.lint = gulp.parallel([stylesLint, scriptsLint]);
