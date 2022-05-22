'use strict'
hexo.extend.helper.register('RandomImage', function(data){
  const defaultCover = hexo.theme.index_posts.default_covers
  let hash = 0
  data.split("").forEach(e => hash += e.charCodeAt())
  return defaultCover[hash % defaultCover.length]
})