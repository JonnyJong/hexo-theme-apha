function blocktip (args, content) {
  let v = args[0].split(",");
  let style = "";
  let cln = "";
  let icln = "";
  if (args[1] != undefined) {
    icln = `<i class="${args[1]}"></i>`
  }
  if (v.length = 1) {
    if (v[0].indexOf("#")>-1) {
      style = ' style="--obj-main:' + v[0] + ';"';
    }else if(v[0]!=""){
      cln = " " + v[0];
    }
  }else if (v.length = 2) {
    if (v[0].indexOf("#")>-1) {
      style = ' style="--obj-main:' + v[0] + ';';
    }else if(v[0]!=""){
      cln = " " + v[0];
    }
    style += '--obj-bg:' + v[1] + ';"';
  }
  return `<div class="blocktip${cln}"${style}>${icln}<div class="content">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div></div>`;
}
hexo.extend.tag.register('blocktip', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_1', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_2', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_3', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_4', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_5', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_6', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_7', blocktip, { ends: true })