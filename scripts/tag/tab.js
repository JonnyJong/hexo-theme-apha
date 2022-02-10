function tabs(args, content) {
  if(content==undefined||content==""){return;}
  let oc = content.split(",,");
  let tabs = "";
  let fc = "";
  let cfg = true;
  let notF = false;
  let arr = "";

  let title = '';
  let cln = ''
  let icon = '';
  let style = '';

  let count = 0;
  oc.forEach(c => {
    if (notF) {
      if (cfg) {
        if (c!=""){
          arr=c.split(",");
          style = "";
          cln = "";
          icon = "";
          title = (arr[0]!="")?'<span class="title">' + arr[0] + '</span>':"";
          if (arr[1]!=undefined&&arr[1]!="") {
            if(arr[1].indexOf("#")>-1){
              style = ' style="--obj-main:' + arr[1] + ';"'
            }else{
              cln = " "+arr[1];
            }
          }
          if (arr[2]!=undefined&&arr[2]!="") {
            icon = '<i class="'+arr[2]+'"></i>'
          }
          tabs+='<div class="tab'+cln+'" onclick="tabs(this,' + count + ')"'+style+'>'+icon+title+'</div>';
        }else{
          tabs+='<div class="tab" onclick="tabs(this,' + count + ')"></div>';
        }
        count++;
        cfg=false;
      }else{
        fc+='<div class="content">' + hexo.render.renderSync({ text: c, engine: 'markdown' }) + '</div>'
        cfg=true;
      }
    }else{
      notF=true;
    }
  });
  return `<div class="tabs"><div class="nav">${tabs}</div><div class="contents">${fc}</div></div>`
}

function tab(args, content) {
  let v = "";
  let title = "";
  let cln = "";
  let style = "";
  let icon = "";
  if (args[0]!=undefined&&args[0]!="") {
    v = args[0].split(",");
    if (v[0]!="") {title = '<span class="title">'+v[0]+'</span>'}
    if(v[1]!=undefined&&v[1]!=""){
      if (v[1].indexOf("#")>-1) {
        style = ' style="--obj-main:' + vl + ';"';
      }else{cln+=" "+v[1];}
    }
    if (v[2]!=undefined&&v[2]!="") {
      icon='<i class="'+v[2]+'"></i>'
    }
  }
  return `<div class="tab"><div class="tb${cln}"${style}>${icon}${title}</div><div class="content">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div></div>`
}

hexo.extend.tag.register('tabs', tabs, { ends: true })
hexo.extend.tag.register('tab', tab, { ends: true })