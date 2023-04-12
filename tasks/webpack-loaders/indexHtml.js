module.exports = (isServedLocally) => {
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { isForDev, options: argsOptions } = require('../env-helper');
  const { src, envs } = require('../build-config');

  const options = (prefix = '.', env) => ({
    template: src.htmlIndex,
    inject: false,
    isProd: !isForDev,
    filename: `${prefix}/index.html`,
    newrelic: ['prod', 'dev'].indexOf(env) > -1,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeCommentsFromCDATA: true,
      removeEmptyAttributes: false,
      removeEmptyElements: false,
      minifyJS: true,
    },
    getConfig: () => `<script src=${global.configManifest?.[env]?.default}></script>`,
    inlinedEntries: ['styles', 'runtime'],
  });

  if (isServedLocally) {
    return [new HtmlWebpackPlugin(options(undefined, argsOptions.env))];
  }
  return envs.map((env) => new HtmlWebpackPlugin(options(`configs/${env}`, env)));
};
