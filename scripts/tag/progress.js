function progress (args, content){
  let cn = '';
  let color = "";
  let style = ' style="width:' + args[1] + ';';
  // if (args[3] != undefined){
  //   style += 'background: url(' + args[3] + ') center 50% / 60px repeat var(--obj-main);';
  // }
  style += '"';
  if (args[2] != undefined){
    switch (args[2]) {
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
        color = ' style="--obj-main:' + args[2] + ';--obj-bg:#8883;"';
        break;
    }
  }

  return `<div class="progress${cn}"${color}><div class="inside"${style}>${hexo.render.renderSync({ text: args[0], engine: 'markdown' })}</div></div>`
}

function progresss (args, content){
  let cn = '';
  let color = "";
  let style = ' style="width:' + args[1] + ';';
  // if (args[3] != undefined){
  //   style += 'background: url(' + args[3] + ') center 50% / 60px repeat var(--obj-main);';
  // }
  style += '"';
  if (args[2] != undefined){
    switch (args[2]) {
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
        color = ' style="--obj-main:' + args[2] + ';--obj-bg:#8883;"';
        break;
    }
  }

  return `<div class="progress${cn}"${color}><div class="inside"${style}>${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div></div>`
}

hexo.extend.tag.register('progress', progress, { ends: false })
hexo.extend.tag.register('progresss', progresss, { ends: true })