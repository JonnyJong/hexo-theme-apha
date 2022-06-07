'use strict'
hexo.extend.helper.register('PostDescription', function(post){
  let priority = hexo.theme.config.index_posts.description.priority
  let limit = (hexo.theme.config.index_posts.description.max_length_of_content ? hexo.theme.index_posts.description.max_length_of_content : 300)
  let defaultContent = hexo.theme.config.index_posts.description.max_length_of_content ? hexo.theme.index_posts.description.max_length_of_content : ''
  let render = !!hexo.theme.config.index_posts.description.render_excerpt
  let result = ''
  select: for (let i = 0; i < priority.length; i++) {
    switch (priority[i]) {
      case 'excerpt':
        if (post.excerpt){
          if (render) {
            result = hexo.render.renderSync({ text: post.excerpt, engine: 'markdown' })
          }else{
            result = this.strip_html(post.excerpt)
          }
          break select
        }
        break
      case 'description':
        if (post.description){
          result = post.description
          break select
        } 
        break
      case 'content':
        if (post.content.length != 0){
          result = this.strip_html(post.content).substr(0,limit)
          break select
        }
      case 'default':
        result = defaultContent
        break select
    }
  }
  return result
})