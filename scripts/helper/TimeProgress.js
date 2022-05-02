'use strict'
hexo.extend.helper.register('TimeProgress', function(type, option){
  let d = new Date()
  let result = 0
  switch (type) {
    case 'year':
      result = d.getFullYear()
      break
    case 'since':
      if(d.getFullYear()==option){
        result = option
      }else{
        result = option + ' - ' + d.getFullYear()
      }
      break
  }
  return result
})