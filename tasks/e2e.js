const gulp = require('gulp');
const { defineConfig } = require('cypress');
const serve = require('./frontend');
const { options, isE2eTest } = require('./env-helper');

const e2eTest = gulp.series((cb) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // For self-signed certificat on OSX
  process.env.IS_E2E = isE2eTest; cb(); /* only used for server side */
}, serve, (cb) => {
  const e2e = require('../e2e/config');
  const cypressConfig = require('../e2e/cypress.config');
  const del = require('del');
  const cypress = require('cypress');

  // If no options, diff will be made between base & actual screenshots, and tests will be executed in electron browser
  // init : set base screenshots
  // ui: open cypress UI to execute tests manually
  // local: path to baseLocal
  const {
    init,
    ui,
    local,
    browser,
    spec,
  } = options;

  const config = {
    env: {
      runDiff: true,
      createBaseSnapshots: false,
      isLocal: !!local || !!ui, // needed for cypress command that do not have access to node process
    },
    browser: browser || 'chrome',
    configFile: 'e2e/cypress.config.js',
    config: defineConfig({
      e2e: {
        specPattern: spec || cypressConfig.e2e.specPattern,
      },
      screenshotsFolder: e2e.paths.run,
    }),
    testingType: 'e2e',
  };

  if (init) {
    config.env.createBaseSnapshots = true;
    config.env.runDiff = false;
    config.config.screenshotsFolder = local ? e2e.paths.baseLocal : e2e.paths.baseGlobal;
  }

  let isRunning = false; // prevent livereload rerun

  // ensure cypress is run after webpack
  global.compiler.hooks.done.tap('end', () => {
    if (isRunning) {
      return;
    }
    // delete older picture taken
    del([e2e.paths.diff, e2e.paths.run]);

    ui && cypress.open(config)
    || cypress.run(config).then(({totalFailed}) => process.exit(totalFailed ? 1 : 0)).catch(() => process.exit(1)); // eslint-disable-line
    isRunning = true;
    return cb();
  });
});

module.exports = e2eTest;
