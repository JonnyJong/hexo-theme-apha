function link (args, content) {
  let v;
  let title = false;
  let img = "";
  if(args[1]!=undefined){
    v = args[1].split(",");
    if ((v.length==1)&&(v[0]!="")) {
      title = v[0];
    }else if (v.length==2) {
      title = v[0]!=""?v[0]:false;
      img = (v[1]!=undefined&&v[1]!="")?'<img alt="link_icon" src="'+v[1]+'">':"";
    }
  }
  return `<a href="${args[0]}" class="t_link"${title?' title="'+title+'"':''}>${img}<div class="info">${title?'<div class="i_title">'+title+'</div>':""}<div class="i_link">${args[0]}</div></div></a>`
}
hexo.extend.tag.register('link', link, { ends: false })