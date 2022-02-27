// 手机端打开菜单
function nav_menu_btn() {
  if (mblNavbar == "none"){
    mblNavbar = document.querySelector("nav.navbar.side");
    mblNavBakCover = document.querySelector("a.nav_menu_cover");
  }
  if (mblNavbar.className == "navbar side"){
    mblNavbar.className = "navbar side show";
    mblNavBakCover.className = "nav_menu_cover show";
  }else{
    mblNavbar.className = "navbar side";
    mblNavBakCover.className = "nav_menu_cover";
  }
}
var mblNavbar = 'none', mblNavBakCover;

// 代码复制按钮
function figureCpBtn(item) {
  window.getSelection().selectAllChildren(item.parentElement.parentElement.querySelector(".code"))
  document.execCommand ("Copy");
  window.getSelection().removeAllRanges();
  item.className = config.icon_check;
  setTimeout(() => {
    item.className = config.icon_copy;
  }, 2000);
}
// 代码块折叠按钮
function figureFdBtn(item){
  item.parentElement.parentElement.classList.toggle("hide")
}

// tag平滑转跳
function tagJump(tag) {
  window.scroll({ top: document.querySelector(tag).offsetTop-80, behavior: 'smooth' });
}

// 折叠块
function unfold(e) {
  e.parentElement.classList.toggle("un")
}
// 标签块
function tabs(e,c) {
  e.parentNode.querySelectorAll(".tab").forEach(element => {
    element.className = element.className.split(" active")[0];
  });
  e.className+=" active";
  let ci = e.parentNode.parentNode.querySelector(".contents").querySelectorAll(".content")
  ci.forEach(element => {
    element.className = "content";
  });
  ci[c].className = "content active";
}

// 搜索功能
var s_db = null;
var s_db_load = true;
var s_ing = true;
var s_r;
var s_c;
var s_hit=false;
var s_tmpSpace;
function search(e) {
  if (s_db==null&&s_db_load==true) {
    s_db_load=false;
    s_msg(e,"load");
    initializeSDB(e);
    s_db_load=true;
  }
  if (s_db!=null&&s_ing==true&&e.value.length>0) {
    s_ing=false;
    s_r=document.createElement("div");
    s_r.className="s_items";
    s_db.forEach(s_n => {
      s_hit=false;
      if (s_n.title!=undefined&&s_n.title.indexOf(e.value)>-1) {s_hit=true;}
      if (!s_hit&&s_n.content!=undefined&&s_n.content.indexOf(e.value)>-1) {s_hit=true;}
      if (!s_hit&&s_n.tag!=undefined) {s_n.tags.forEach(tag => {(tag.indexOf(e.value)>-1)?s_hit=true:"";});}
      if (!s_hit&&s_n.categories!=undefined) {s_n.categories.forEach(cat => {(cat.indexOf(e.value)>-1)?s_hit=true:"";});}
      if (s_hit) {
        const item = document.createElement("a");
        item.className = "item";
        item.setAttribute("href",s_n.url)
        item.innerHTML='<div class="title">'+(s_n.title!=undefined?s_n.title:config.s_notitle)+'</div>';
        item.innerHTML += ((s_n.content!=undefined&&s_n.content!="")?'<div class="content">'+s_n.content.replace(/<[^>]+>/g, "").slice(0,100)+'</div>':'');
        if ((s_n.categories!=undefined&&s_n.categories.length!=0)||(s_n.tags!=undefined&&s_n.tags.length!=0)) {
          s_tmpSpace="";
          s_tmpSpace+='<div class="more_info">';
          if (s_n.tags!=undefined&&s_n.tags.length!=0) {
            s_tmpSpace+=(s_n.tags.length==1?'<i class="'+config.icon_tag+'"></i>':'<i class="'+config.icon_tags+'"></i>');
            s_n.tags.forEach(tag => {
              s_tmpSpace+='<span class="tag">'+tag+' </span>';
            });
          }
          if ((s_n.categories!=undefined&&s_n.categories.length!=0)||(s_n.tags!=undefined&&s_n.tags.length!=0)) {s_tmpSpace+='<div class="line_warp_h"></div>'}
          if (s_n.categories!=undefined&&s_n.categories.length!=0) {
            s_tmpSpace+='<i class="'+config.icon_archive+'"></i>';
            s_n.categories.forEach(cat => {
              s_tmpSpace+='<span class="category">'+cat+' </span>';
            });
          }
          item.innerHTML+=s_tmpSpace+'</div>';
        }
        s_r.appendChild(item);
      }
    });
    if (s_r.childElementCount==0) {
      (e.nextSibling.querySelector(".s_items")!=null)?e.nextSibling.querySelector(".s_items").remove():"";
      s_msg(e,"nothing");
    }else{
      s_msg(e,"remove");
      (e.nextSibling.querySelector(".s_items")!=null)?e.nextSibling.querySelector(".s_items").remove():"";
      e.nextSibling.appendChild(s_r);
    }
    s_ing=true;
  }else if (e.value.length==0) {
    (e.nextSibling.querySelector(".s_items")!=null)?e.nextSibling.querySelector(".s_items").remove():"";
  }
}
// 初始化 json
function initializeSDB(e) {
  var require = new XMLHttpRequest();
  require.open("get",config.s_db_href);
  require.send(null);
  require.onload = function(){
    if(require.status == 200){
      s_db = JSON.parse(require.responseText);
      s_msg(e,"remove");
      return;
    }else{
      s_db_load=true;
      s_msg(e,"failed");
      console.error("搜索数据库加载失败！Search DB failed to load!\n错误代码/code: "+require.status);
    }
  }
}
// 搜索消息
function s_msg(e,type) {
  var text;
  switch (type) {
    case "load":
      text = config.s_msg_load
      break;
    case "failed":
      text = config.s_msg_failed
      break;
    case "nothing":
      text = config.s_msg_nothing
      break;
    case "remove":
      e.nextSibling.querySelector(".s_msg")!=null?e.nextSibling.querySelector(".s_msg").remove():"";
      break;
  }
  if (e.nextSibling.querySelector(".s_msg")==null) {
    const inject = document.createElement("div");
    inject.textContent = text;
    inject.className = "s_msg";
    e.nextSibling.appendChild(inject);
  }else{
    e.nextSibling.querySelector(".s_msg").innerText=text;
  }
}

// 首页组件 - says
var saysCount = 0;
var saysItem, saysTimeout;
function says() {
  console.log(saysCount);
  if (!saysItem) {
    saysTimeout=parseInt(document.querySelector(".index_items .item.say .contents").getAttribute("speed"));
    saysItem=document.querySelectorAll(".index_items .item.say .contents .content");
  }
  setTimeout(says, saysTimeout);

  document.querySelector(".index_items .item.say .contents .content.in")?document.querySelector(".index_items .item.say .contents .content.in").className='content out':''

  setTimeout(() => {
    saysItem[saysCount].className='content in'
    saysCount++;
    if (saysCount==saysItem.length) {
      saysCount=0;
    }
  }, 200);
}

document.addEventListener('DOMContentLoaded', function () {

  //时间间隔
  function diffTime(inputTime, type) {
    const inputTimeAf = new Date(inputTime).getTime();
    const curDate = new Date().getTime();

    var diff = curDate- inputTimeAf;

    var days=Math.floor(diff/86400000);
    var lvH=diff%86400000;

    var h=Math.floor(lvH/3600000);
    var lvMin=lvH%3600000;

    var min=Math.floor(lvMin/60000);
    var lvS=lvMin%60000;

    var s=Math.round(lvS/1000);

    switch (type) {
      case 1:
        return ((days==0) ? "" : days+" "+config.lang_days+" ") + ((h==0) ? "" : h+" "+config.lang_hours+" ") + ((min==0) ? "" : min+" "+config.lang_mins+" ") + ((s==0) ? "" : s+" "+config.lang_s);
      case 2:
        return ((days==0) ? "" : days+" "+config.lang_days+" ");
      case 3:
        return ((days!=0) ? days+" "+config.lang_days_b : ((h!=0) ? h+" "+config.lang_hours_b : ((min!=0) ? min+" "+config.lang_mins_b : s+" "+config.lang_s_b)))
      default:
        return;
    }
    
  }

  // 滚动事件
  var doRunOnscroll = true;
  window.onscroll = function(e){
    if (!doRunOnscroll) {return;}
    doRunOnscroll = false;
    setTimeout(() => {
      runOnscroll();
      doRunOnscroll = true;
    }, 100);
  }
  // 执行事件
  function runOnscroll() {
    config.navFold && navFold();
    config.ifToc && (tocObj.length != 0) && tocFready();
    config.ifQuickBtn && qBtnAutoHide();
  }
  
  // 导航栏自动收起
  function navFold() {
    if ((saveOffset - window.pageYOffset) < -4) {
      rowNavbar.classList.add("hide")
    } else if ((saveOffset - window.pageYOffset) > 4) {
      rowNavbar.classList.remove("hide")
    }
    saveOffset = window.pageYOffset;
  }
  var saveOffset = window.pageYOffset;
  var rowNavbar = document.querySelector("nav.navbar.row");

  // 最后更新日期
  function updateTime() {
    const lastTime = document.getElementById("last_update");
    if (lastTime) {
      const lastValue = new Date(lastTime.getAttribute("last_update_value")).getTime();
      lastTime.innerHTML = diffTime(lastValue, 3);
    }
  }

  // 运行时长
  function runtime() {
    // setTimeout(runtime, 1000);
    const runtimes = document.getElementById("runtime");
    if (runtimes) {
      const beginTime = new Date(runtimes.getAttribute("beginTime")).getTime();
      runtimes.innerHTML = diffTime(beginTime, 2);
    }
  }

  // 图片描述
  function imgDes() {
    document.querySelectorAll("main img").forEach(item => {
      const title = item.getAttribute("title");
      if (title != null) {
        const inject = document.createElement("div");
        inject.textContent = title;
        inject.className = "img_des";
        item.parentNode.insertBefore(inject, item.nextSibling);
      }
    });
  }

  // 归档页面
  function archive(){
    var t = document.querySelectorAll("main .tag-list-link");
    var tC = document.querySelectorAll("main .tag-list-count");
    var tL = t.length - 1;
    var c = document.querySelectorAll("main .category-list-link");
    var cC = document.querySelectorAll("main .category-list-count");
    var cL = c.length - 1;
    var a = document.querySelectorAll("main .archive-list-link");
    var aC = document.querySelectorAll("main .archive-list-count");
    var aL = a.length - 1;

    for (; tL >= 0; tL--) {
      t[tL].innerText += " - " + tC[tL].innerText;
      tC[tL].remove();
    }
    for (; cL >= 0; cL--) {
      c[cL].innerText += " - " + cC[cL].innerText;
      cC[cL].remove();
    }
    for (; aL >= 0; aL--) {
      a[aL].innerText += " - " + aC[aL].innerText;
      aC[aL].remove();
    }

    var sC = document.querySelectorAll(".sidebar_items .category-list-link");
    var sCC = document.querySelectorAll(".sidebar_items .category-list-count");
    var sCL = sC.length - 1;

    for (; sCL >= 0; sCL--) {
      const inject = document.createElement("span");
      inject.textContent = sCC[sCL].innerText;
      inject.className = "category-list-count";
      sC[sCL].appendChild(inject);
      sCC[sCL].remove();
    }
  }

  // 运行时间 页脚
  function sinceTo() {
    const s = document.getElementById("sinceTo");
    const sY = parseInt(s.getAttribute("since"));
    const nY = new Date().getFullYear();
    if (sY >= nY) {
      s.innerHTML = sY;
    }else{
      s.innerHTML = sY + " - " + nY
    }
  }
  function runtimeFooter() {
      setTimeout(runtimeFooter, 1000);
      const s = document.getElementById("runtimeFooter");
      const sT = new Date(s.getAttribute("begin")).getTime();
      s.innerHTML = diffTime(sT, 1);
  }

  // 代码块相关
  function copyBtn(item){
    const injectBtn = document.createElement("i");
    const head = item.querySelectorAll("figcaption")[0]
    injectBtn.setAttribute("onclick", "figureCpBtn(this);");
    injectBtn.className = config.icon_copy;
    head.insertBefore(injectBtn, head.lastChild.nextSibling);
  }
  function foldBtn(item){
    const injectBtn = document.createElement("i");
    const head = item.querySelectorAll("figcaption")[0]
    injectBtn.setAttribute("onclick", "figureFdBtn(this);");
    injectBtn.className = config.icon_fold+' foldBtn';
    head.insertBefore(injectBtn, head.lastChild.nextSibling);
  }
  function autoFold(item) {
    if (config.fdVal==0) {
      item.classList.add("hide")
    }else if (item.querySelector("table").offsetHeight>config.fdVal){
      item.querySelector("table").classList.add("folded")
      item.innerHTML+='<i class="'+config.icon_fig_more+' auto_fold" onclick="this.parentElement.querySelector(\'table\').classList.toggle(\'folded\')"></i>'
      // item.querySelector("table").innerHTML+='<i class="'+config.icon_fig_more+' auto_fold" onclick="this.parentElement.classList.toggle(\'folded\')"></i>'
    }
  }
  function figure() {
    const items = document.querySelectorAll("figure.highlight");
    items.forEach(item => {
      const itemType = item.classList[1]
      const head = item.querySelectorAll("figcaption").length != 0 ? item.querySelectorAll("figcaption") : false;
      if (head) {
        const inject = document.createElement("span");
        inject.textContent = itemType;
        head[0].insertBefore(inject, head[0].querySelectorAll("span")[0]);
      }else{
        const table = item.querySelectorAll("table");
        const inject = document.createElement("figcaption");
        const inside = document.createElement("span");
        inside.textContent = itemType;
        inject.appendChild(inside);
        item.insertBefore(inject, table[0]);
      }
      config.fdBtn && foldBtn(item);
      config.cpBtn && copyBtn(item);
      (config.fdVal&&config.fdVal>=0) && autoFold(item);
    });
  }

  // 侧栏
  // 清理空白的块
  function cleanSidebat() {
    document.querySelectorAll(".sidebar_items .item").forEach(item => {
      if (!(item.childElementCount - item.querySelectorAll(".item_info").length)) {
        item.remove();
      }
    });
  }
  // 目录
  function tocFready(){
    // 准备
    mTiTop = [];
    mainTitle.forEach(item => {
      let fTop = item.offsetTop;
      let binElm = item.offsetParent;
      while (binElm != null) {
        fTop += binElm.offsetTop;
        binElm = binElm.offsetParent;
      }
      mTiTop.push(fTop)
    });
    // 执行
    let c = tocObj.length;
    let cR = c;
    while (cR > 0) {
      cR--;
      tocObj[cR].className = "toc-link";
    }
    while (c > 0) {
      c--;
      if ((mTiTop[c] - window.pageYOffset) < 100) {
        break;
      }
    }
    tocObj[c].className = "toc-link active";
    tocWindow.scroll({ top: tocObj[c].offsetTop-150, behavior: 'smooth' });
  }
  function tocjump(){
    tocObj.forEach(item => {
      item.setAttribute("onclick", "tagJump('" + decodeURI(item.getAttribute("href")) + "');");
      item.removeAttribute("href")
    });
  }
  var mainTitle = document.querySelectorAll("article h1,article h2,article h3,article h4,article h5,article h6");
  var mTiTop = new Array();
  var tocObj = document.querySelectorAll(".sidebar_items .toc-link");
  var tocWindow = document.querySelector(".sidebar_items .toc");

  // 自动隐藏快捷按钮
  function qBtnAutoHide(){
    window.pageYOffset>300?(document.querySelector(".quick_btn").classList.add("show")):""
    window.pageYOffset<=300?(document.querySelector(".quick_btn").classList.remove("show")):""
  }

  // 运行 says
  function saysInit() {
    if (document.querySelector(".index_items .item.say .contents")!=null) {
      says();
    }
  }

  cleanSidebat();
  updateTime();
  runtime();
  config.imgDesc && imgDes();
  archive();
  config.fooSt && sinceTo();
  figure();
  config.fooRt && runtimeFooter();
  config.tocSmJ && config.ifToc && (tocObj.length != 0) && tocjump();
  saysInit();

})