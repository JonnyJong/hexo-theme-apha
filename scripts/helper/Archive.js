'use strict'
hexo.extend.helper.register('TagProgress', function(e){
  e = e.replace(/<\/a><span class="tag-list-count">/g , ' - ').replace(/\/span/g, '/a')
  return e
})
hexo.extend.helper.register('CategoryProgress', function(e){
  e = e.replace(/<\/a><span class="category-list-count">/g, ' - ').replace(/\/span/g, '/a')
  return e
})
hexo.extend.helper.register('ArchiveProgress', function(e){
  e = e.replace(/<\/a><span class="archive-list-count">/g, ' - ').replace(/\/span/g, '/a')
  return e
})