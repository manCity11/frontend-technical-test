const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { dest, envs } = require('./build-config');

const bundleConfs = (cb) => {
  const _ = require('lodash');

  global.configManifest = {};
  const getContent = (content) => `(function() {
    window.__CLIENT_CONFIG__=${JSON.stringify(content)};
  })()`;
  const defaultPath = require.resolve('../config/default');
  delete require.cache[defaultPath];
  const defaultConfig = require(defaultPath);

  envs.forEach((env) => {
    global.configManifest[env] = {};
    const configsPath = path.join(dest.distPath, `/configs/${env}`);
    fs.mkdirSync(configsPath, { recursive: true });

    defaultConfig.locales_url = global.localesBundle;
    const envPath = require.resolve(`../config/${env}`);
    delete require.cache[envPath];
    const envConfig = require(envPath);

    const finalDefaultConfig = _.merge({}, defaultConfig, envConfig);

    const finalDefaultContent = getContent(finalDefaultConfig);
    const hash = crypto.createHash('md5').update(finalDefaultContent).digest('hex');
    const finalDefaultPath = `config-${hash}.js`;
    fs.writeFileSync(path.join(configsPath, finalDefaultPath), finalDefaultContent);
    global.configManifest[env].default = `${finalDefaultPath}`;
  });

  cb();
};

module.exports = bundleConfs;
