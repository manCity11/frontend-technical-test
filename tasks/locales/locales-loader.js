const store = require('./locales-store');

module.exports = function (content) { // eslint-disable-line
  const localePath = this.resourcePath
    .replace(process.cwd(), '')
    .replace(/[\\/]/g, '-');
  store.add(localePath, JSON.parse(content));
  return content;
};
