function check (args, content) {
  let v = args[0].split(",");
  let checked = false;
  let style = "";
  let cln = "";
  v.forEach(vl => {
    if (vl=="x"||vl=="o"||vl=="p"||vl=="m"||vl=="v") {
      checked = true;
      cln += " " + vl;
    }else if(vl.indexOf("#")>-1){
      style = ' style="--obj-main:' + vl + ';"';
    }else{
      cln += " " + vl;
    }
  });
  return `<div class="check${cln}"${style}><input type="checkbox" disabled${checked?" checked":""}></input>${hexo.render.renderSync({ text: args[1], engine: 'markdown' })}</div>`
}
hexo.extend.tag.register('check', check, { ends: false })