function result(v, c) {
  let style = "";
  let cln = "";
  if (v[1]!=undefined) {
    if (v[1].indexOf("#")>-1) {
      style = "background:"+v[1]+";";
    }else if (v[1]!="") {
      cln = " "+v[1];
    }
  }else{
    if (v[0]=="p") {
      return `<p>${c}</p>`
    } else {
      return `<span>${c}</span>`
    }
  }
  style+=(v[2]!=undefined&&v[2]!="")?"color:"+v[2]+";":"";
  style+=(v[3]!=undefined&&v[3]!="")?"font-size:"+v[3]+";":"";
  style+=(v[4]!=undefined&&v[4]!="")?"text-align:"+v[4]+";":"";
  cln+=(v[4]!=undefined&&v[4]!="")?" "+v[4]:"";
  style = style!="" ? (' style="'+style+'"') : "";
  if (v[0]=="p") {
    return `<p class="colorful${cln}"${style}>${c}</p>`
  } else {
    return `<span class="colorful${cln}"${style}>${c}</span>`
  }
}

function colorful (args, content) {
  if (args[1]==undefined) {
    return `<span>${args[0]}</span>`
  }
  let i_v = args[1].split(",");
  let i_c = args[0];
  return result(i_v, i_c);
}
function color (args, content) {
  if (args[0]==undefined) {
    return `<span>${content}</span>`
  }
  let i_v = args[0].split(",");
  let i_c = content;
  return result(i_v, i_c);
}

hexo.extend.tag.register('colorful', colorful, { ends: false })
hexo.extend.tag.register('color', color, { ends: true })