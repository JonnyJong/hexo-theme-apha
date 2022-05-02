hexo.extend.helper.register('configVersion', function(){
  const packageJson = require('../../package.json')
  return packageJson.version;
});
hexo.extend.helper.register('configBuild', function(){
  const packageJson = require('../../package.json')
  return packageJson.build;
});