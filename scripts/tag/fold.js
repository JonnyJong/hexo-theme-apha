function fold(args, content) {
  let title = "";
  if (args[0]!=undefined&&args[0]!="") {title='<span class="title">'+args[0]+'</span>';}
  return `<div class="fold"><div class="head" onclick="unfold(this)"><i class="fa fa-caret-right"></i>${title}</div><div class="content">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div></div>`
}

hexo.extend.tag.register('fold', fold, { ends: true })
hexo.extend.tag.register('folds', fold, { ends: true })