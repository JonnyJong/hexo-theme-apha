'use strict'
hexo.extend.helper.register('StatisticsTag', function(conditions){
  let result = 0
  conditions.forEach(e => {
    result += this.site.tags.findOne({name: e}).length
  })
  return result
})
hexo.extend.helper.register('StatisticsCategory', function(conditions){
  let result = 0
  conditions.forEach(e => {
    result += this.site.categories.findOne({name: e}).length
  })
  return result
})