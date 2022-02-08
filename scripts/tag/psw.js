function psw(args, content) {
  let title = "";
  if (args[1] != undefined) {
    title = ' title="' + args[1] + '"';
  }
  return `<psw${title}>${hexo.render.renderSync({ text: args[0], engine: 'text' })}</psw>`;
}

function block_psw(args, content) {
  let title = "";
  if (args[0] != undefined) {
    title = ' title="' + args[0] + '"';
  }
  return `<psw${title}>${hexo.render.renderSync({ text: content, engine: 'text' })}</psw>`;
}

hexo.extend.tag.register('psw', psw, { ends: false })
hexo.extend.tag.register('psw_block', block_psw, { ends: true })