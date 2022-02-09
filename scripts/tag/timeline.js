function timeline (args, content){
  let title = (args[0]!=undefined&&args[0]!="")?'<div class="title">'+args[0]+"</div>":"";
  let direction = (args[1]!=undefined&&args[1]!="")?" "+args[1]:"";
  return `<div class="timeline${direction}">${title}<div class="nodes">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div></div>`
}
function timenode (args, content){
  return `<div class="timenode">${args[0]!=undefined&&args[0]!=""?'<div class="nodetitle">'+args[0]+'</div>':""}<div class="content">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div></div>`
}
hexo.extend.tag.register('timeline', timeline, { ends: true })
hexo.extend.tag.register('timenode', timenode, { ends: true })