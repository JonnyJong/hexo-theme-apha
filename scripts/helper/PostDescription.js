'use strict'
hexo.extend.helper.register('PostDescription', function(post, priority, limit, defaultContent){
  // let priority = hexo.theme.index_posts.description.priority
  // let limit = (hexo.theme.index_posts.description.max_length_of_content ? hexo.theme.index_posts.description.max_length_of_content : 300)
  // let defaultContent = hexo.theme.index_posts.description.max_length_of_content ? hexo.theme.index_posts.description.max_length_of_content : ''
  let result = ''
  select: for (let i = 0; i < priority.length; i++) {
    switch (priority[i]) {
      case 'excerpt':
        if (post.excerpt){
          result = this.strip_html(post.excerpt)
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