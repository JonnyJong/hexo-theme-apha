function progress (args, content){
  let cn = '';
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

  return `<div class=></div>`
}

hexo.extend.tag.register('progress', progress, { ends: false })