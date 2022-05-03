'use strict'
hexo.extend.filter.register('after_post_render', function(data){
  // 匹配图片
  const reg = /(?<=(\<img)).*?(?=(\>))/g
  // 匹配非标题部分
  const regTitle = /^((?!(?<=(title\=\")).*?(?=(\"))).)*/g
  // 匹配非 alt 部分
  const regAlt = /^((?!(?<=(alt\=\")).*?(?=(\"))).)*/g
  // 匹配 alt 中的 title
  const regTitleInAlt = /(?<=(" t)).*?(?=(\>))/g
  // 进行匹配
  if (hexo.theme.config.page.img_desc) {
    data.content = data.content.replace(reg, a => {
      switch (hexo.theme.config.page.img_desc) {
        case 'title':
          if (a.indexOf('title=')>-1) {
            return a + '><div class="img-excerpt">'+a.replace(regTitle, '').substring(0,a.replace(regTitle, '').length-1)+'</div'
          }else{
            return a
          }
        case 'alt':
          if (a.indexOf('alt=')>-1 && a.indexOf('title=')>-1) {
            return a + '><div class="img-excerpt">'+a.replace(regAlt, '').substring(0,a.indexOf('"'))+'</div'  
          }else if(a.indexOf('alt=')>-1){
            return a + '><div class="img-excerpt">'+a.replace(regAlt, '').substring(0,a.replace(regAlt, '').length-1)+'</div'  
          }else{
            return a
          }
        case 'title_alt':
          if (a.indexOf('title=')>-1) {
            return a + '><div class="img-excerpt">'+a.replace(regTitle, '').substring(0,a.replace(regTitle, '').length-1)+'</div'
          }else if (a.indexOf('alt=')>-1 && a.indexOf('title=')>-1) {
            return a + '><div class="img-excerpt">'+a.replace(regAlt, '').substring(0,a.indexOf('"'))+'</div'  
          }else if(a.indexOf('alt=')>-1){
            return a + '><div class="img-excerpt">'+a.replace(regAlt, '').substring(0,a.replace(regAlt, '').length-1)+'</div'  
          }else{
            return a
          }
        case 'alt_title':
          if (a.indexOf('alt=')>-1 && a.indexOf('title=')>-1) {
            return a + '><div class="img-excerpt">'+a.replace(regAlt, '').substring(0,a.indexOf('"'))+'</div'  
          }else if(a.indexOf('alt=')>-1){
            return a + '><div class="img-excerpt">'+a.replace(regAlt, '').substring(0,a.replace(regAlt, '').length-1)+'</div'  
          }else if (a.indexOf('title=')>-1) {
            return a + '><div class="img-excerpt">'+a.replace(regTitle, '').substring(0,a.replace(regTitle, '').length-1)+'</div'
          }else{
            return a
          }
        default:
          return a
      }
    })
  }
  return data
})