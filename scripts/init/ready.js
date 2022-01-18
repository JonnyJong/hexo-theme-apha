const logger = require('hexo-log')()

hexo.on('ready', () => {
  const { version } = require('../../package.json')
  const { build } = require('../../package.json')
  const { license } = require('../../package.json')
  logger.info(`
===============================
\x1B[32mApha\x1B[0m:
  \x1B[32mversion\x1B[0m: ${version} 
  \x1B[32mbuild\x1B[0m: ${build} 
\x1B[32mLicense\x1B[0m: ${license} 
===============================`)
})
