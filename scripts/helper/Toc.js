'use strict'
hexo.extend.helper.register('TocChecker', function(e){
  return e.length!=0
})
hexo.extend.helper.register('TocProgress', function(e){
  let result = e
  const reg = /(?<=(href\=\")).*?(?=(\"))/g
  result = result.replace(reg, (a)=>{
    return a + '" onclick="setTimeout(() => {$.TocOnlick(\''+decodeURI(a)+'\')}, 0);return false;'
  })
  return result
})