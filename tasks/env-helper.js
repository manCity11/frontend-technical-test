const minimist = require('minimist');

const options = minimist(process.argv.slice(2));
const e2e = options._[0] === 'e2e';
const env = e2e && 'e2e' || options.env || 'dev';

module.exports = {
  options: { ...options, env },
  isProd: env === 'prod',
  isForDev: env !== 'prod',
  isE2eTest: e2e,
};
