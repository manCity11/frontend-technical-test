const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '.'),
  acsPath: 'payment-order-form-request',

  paths: {
    baseLocal: path.resolve(__dirname, './cypress/snapshots/base-local'),
    baseGlobal: path.resolve(__dirname, './cypress/snapshots/base'),
    diff: path.resolve(__dirname, './cypress/snapshots/diff'),
    run: path.resolve(__dirname, './cypress/snapshots/actual'),
  },

  types: {
    base: 'base',
    run: 'actual',
    diff: 'diff',
  },
};
