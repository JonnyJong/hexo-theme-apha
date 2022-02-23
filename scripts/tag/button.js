function button (args, content) {
  let v = args[0].split(",");
  let style = "";
  let cln = "";
  if (v[3]) {
    if(v[3].indexOf("#")>-1){
      style = ' style="--obj-main:' + v[3] + ';"';
    }else{
      cln += " " + v[3];
    }
  }
  if (v[4]) {cln += " " + v[4];}

  return `<a href="${v[0]}" class="t_button${cln}"${style}>${(v[2]?('<i class="'+v[2]+'"></i>'):'')+(v[1]?('<span>'+v[1]+'</span>'):'')}</a>`
}

hexo.extend.tag.register('button', button, { ends: false })