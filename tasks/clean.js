const del = require('del');
const { dest } = require('./build-config');

/**
 * Clean dist, tmp folders
 */
const clean = (cb) => del(dest.clean, cb);

module.exports = clean;
