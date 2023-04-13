const plugins = require('./cypress/plugins');

module.exports = {
  video: false,
  fixturesFolder: 'e2e/cypress/fixtures',
  trashAssetsBeforeRuns: true,
  chromeWebSecurity: false,
  blockHosts: [],
  reporter: 'min',
  e2e: {
    supportFile: 'e2e/cypress/support/index.js',
    specPattern: 'e2e/tests/**/*.js',
    setupNodeEvents: plugins,
    baseUrl: 'http://localhost:3000',
  },
};
