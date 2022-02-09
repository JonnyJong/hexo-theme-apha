function radio (args, content) {
  let v = args[0].split(",");
  let checked = false;
  let style = "";
  let cln = "";
  v.forEach(vl => {
    if (vl=="x") {
      checked = true;
    }else if(vl.indexOf("#")>-1){
      style = ' style="--obj-main:' + v[1] + ';"';
    }else{
      cln = " " + vl;
    }
  });
  return `<div class="radio${cln}"${style}><input type="radio" disabled${checked?" checked":""}></input>${hexo.render.renderSync({ text: args[1], engine: 'markdown' })}</div>`
}
hexo.extend.tag.register('radio', radio, { ends: false })