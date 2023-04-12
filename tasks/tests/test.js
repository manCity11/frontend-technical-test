const { run } = require('jest');
const path = require('path');

const test = (cb) => {
  const jestOptions = process.argv.slice(3);
  /* eslint-disable no-process-env */
  process.env.NODE_ENV = 'test';
  const PluginError = require('plugin-error');

  run(['--config', path.resolve(__dirname, './config.js'), '--colors', ...jestOptions])
    .then(() => {
      cb();
    }).catch(() => {
      cb(new PluginError('gulp-test', { message: 'Tests Failed' }));
    });
};

module.exports = test;
