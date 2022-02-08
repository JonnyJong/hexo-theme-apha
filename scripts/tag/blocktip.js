function blocktip (args, content) {
  let cn = '';
  let icon = "";
  let icn;
  let color = "";
  if (args[0] != undefined){
    switch (args[0]) {
      case "default":
        cn = ' c_de';
        break;
      case "red":
        cn = ' c_re';
        break;
      case "orange":
        cn = ' c_or';
        break;
      case "yellow":
        cn = ' c_ye';
        break;
      case "green":
        cn = ' c_gr';
        break;
      case "cyan":
        cn = ' c_cy';
        break;
      case "blue":
        cn = ' c_bl';
        break;
      case "purple":
        cn = ' c_pu';
        break;
      default:
        color = ' style="--obj-main:' + args[0] + ';';
        break;
    }
  }
  if (args[1] != undefined){
    switch (args[1]) {
      case "default":
        cn += ' b_de';
        break;
      case "red":
        cn += ' b_re';
        break;
      case "orange":
        cn += ' b_or';
        break;
      case "yellow":
        cn += ' b_ye';
        break;
      case "green":
        cn += ' b_gr';
        break;
      case "cyan":
        cn += ' b_cy';
        break;
      case "blue":
        cn += ' b_bl';
        break;
      case "purple":
        cn += ' b_pu';
        break;
      default:
        color += '--obj-bg:' + args[1] + ';';
        break;
    }
  }
  color += '"';
  if (args[2] != undefined) {
    icn = args[2];
    icon = `<i class="${icn}"></i>`;
  }
  return `<div class="blocktip${cn}"${color}>${icon}<div class="content">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div></div>`;
}
hexo.extend.tag.register('blocktip', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_1', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_2', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_3', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_4', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_5', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_6', blocktip, { ends: true })
hexo.extend.tag.register('blocktip_7', blocktip, { ends: true })