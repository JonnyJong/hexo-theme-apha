function progress (args, content){
  let v = args[0].split(",");
  let style = "";
  let cln = "";
  if (v.length==2) {
    if(v[1].indexOf("#")>-1){
      style = ' style="--obj-main:' + v[1] + ';"';
    }else{
      cln = " "+v[1];
    }
  }else if(v.length==3){
    style = ' style="';
    if(v[1].indexOf("#")>-1){
      style += '--obj-main:' + v[1] + ';';
    }else if(v[1]!=""){
      cln = " "+v[1];
    }
    style += '--obj-bg:' + v[2] + ';"';
  }
  return `<div class="progress${cln}"${style}><div class="inside" style="width:${v[0]};">${hexo.render.renderSync({ text: args[1], engine: 'markdown' })}</div></div>`;
}

function progresss (args, content){
  let v = args[0].split(",");
  let style = "";
  let cln = "";
  // if (args[3] != undefined){
  //   style += 'background: url(' + args[3] + ') center 50% / 60px repeat var(--obj-main);';
  // }
  if (v.length==2) {
    if(v[1].indexOf("#")>-1){
      style = ' style="--obj-main:' + v[1] + ';"';
    }else{
      cln = " "+v[1];
    }
  }else if(v.length==3){
    style = ' style="';
    if(v[1].indexOf("#")>-1){
      style += '--obj-main:' + v[1] + ';';
    }else if(v[1]!=""){
      cln = " "+v[1];
    }
    style += '--obj-bg:' + v[2] + ';"';
  }
  return `<div class="progress${cln}"${style}><div class="inside" style="width:${v[0]};">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div></div>`;
}

hexo.extend.tag.register('progress', progress, { ends: false })
hexo.extend.tag.register('progresss', progresss, { ends: true })