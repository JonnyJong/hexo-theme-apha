'use strict'
hexo.extend.filter.register('after_post_render', function(data){
  if (hexo.theme.config.page.title_seo_for_bing) {
    data.content = data.content.replace(/<h5 id="/g, '<h6 id="')
    data.content = data.content.replace(/<\/h5>/g, '</h6>')

    data.content = data.content.replace(/<h4 id="/g, '<h5 id="')
    data.content = data.content.replace(/<\/h4>/g, '</h5>')

    data.content = data.content.replace(/<h3 id="/g, '<h4 id="')
    data.content = data.content.replace(/<\/h3>/g, '</h4>')

    data.content = data.content.replace(/<h2 id="/g, '<h3 id="')
    data.content = data.content.replace(/<\/h2>/g, '</h3>')

    data.content = data.content.replace(/<h1 id="/g, '<h2 id="')
    data.content = data.content.replace(/<\/h1>/g, '</h2>')
  }
  return data;
})