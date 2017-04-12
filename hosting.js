const versionName = require('./package.json').version
const environmentName = process.env.NODE_ENV
const settingName = process.env.SETTING_ENV
const publicPath = process.env.PUBLIC_PATH.replace('{VERSION}', versionName)
const isPack = process.env.PACK == 'true'

module.exports.versionName = versionName;

module.exports.environmentName = environmentName;

module.exports.settingName = settingName;

module.exports.isDevelopment = environmentName.toLowerCase() == 'development';

module.exports.publicPath = publicPath;

module.exports.isPack = isPack;

module.exports.entry = process.env.ENTRY;
