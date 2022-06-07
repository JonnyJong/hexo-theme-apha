'use strict'
hexo.extend.helper.register('Checker', function(input){
  console.log({type:typeof(input),input});
  return
})
hexo.extend.helper.register('Compare', function(input, input2){
  return input == input2
})