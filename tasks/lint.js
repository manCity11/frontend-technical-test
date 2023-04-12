const { ESLint } = require('eslint');
const styleLint = require('stylelint');
const log = require('fancy-log');
const { src } = require('./build-config');

const scriptsLint = async (cb) => {
  try {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(src.reports.scripts);

    let errors = 0;
    let warnings = 0;

    results.forEach(({ errorCount, warningCount }) => {
      errors += errorCount;
      warnings += warningCount;
    });

    if (errors > 0 || warnings > src.reports.maxWarnings) {
      const formatter = await eslint.loadFormatter('stylish');
      const resultText = formatter.format(results);
      warnings > src.reports.maxWarnings && log.error(`Failed because of too many warnings. Found ${warnings} warnings, threshold is ${src.reports.maxWarnings}.`);
      throw new Error(resultText);
    }

    cb();
  } catch (error) {
    cb(error);
  }
};

const stylesLint = () => styleLint.lint({ files: src.reports.styles, formatter: 'string' }).then(({ errored, output }) => {
  if (errored) {
    return Promise.reject(new Error(output));
  }
});

module.exports = { stylesLint, scriptsLint };
