function blocktip (args, content) {
//return '<div class="blocktip">${hexo.render.render({text: content, engine: "markdown"})}</div>'
}
hexo.extend.tag.register('blocktip', blocktip, { ends: true })