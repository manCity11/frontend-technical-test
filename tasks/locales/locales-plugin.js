const _ = require('lodash');
const webpack = require('webpack');
const MessageFormat = require('@messageformat/core');
const compileModule = require('@messageformat/core/compile-module');
const store = require('./locales-store');

class LocalesPlugin {
  apply(compiler) { // eslint-disable-line
    compiler.hooks.compilation.tap('LocalesPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        { name: 'LocalesPlugin', stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE },
        (assets) => {
          _.each(assets, (value, key) => {
            compilation.deleteAsset(key);
          });
          const trad = {};
          _.each(store.get(), (value, key) => {
            const lang = key.match(/locales-([a-z]{2})\.i18n$/)[1];
            if (!trad[lang]) {
              trad[lang] = [];
            }
            trad[lang].push({
              id: key,
              source: value,
            });
          });

          _.each(trad, (value, lang) => {
            const mergedTrad = _.merge(...value.map(({ source }) => source));
            compilation.emitAsset(`locales.${lang}.js`, new webpack.sources.RawSource(compileModule(new MessageFormat(lang), mergedTrad)));
          });
        },
      );
    });
  }
}

module.exports = { LocalesPlugin };
