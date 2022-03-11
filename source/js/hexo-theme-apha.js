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
var searchDb = null; // 搜索数据库
var searchDb_load = true; // 未在加载数据库
var isNotSearching = true; // 当前未在搜索
var searchResult; // 搜索结果（文章）
var searchResult_cate; // 分类
var searchResult_tag; // 标签
var s_c; // 未知，待移除
var ifHit=false; // 找到结果
var searchTemp; // 搜索临时空间
var searchKeywords = [] // 搜索关键词
var searchTags = []
function searchX(e) {
  // 若未加载数据库且未在加载
  if (searchDb==null&&searchDb_load==true) {
    searchDb_load=false;
    s_msg(e,"load");
    initializeSDB(e);
    searchDb_load=true;
  }
  // 当数据库存在、之前的搜索已经完成、输入值不为空
  if (searchDb!=null&&isNotSearching==true&&e.value.length>0) {
    // 初始化关键词（区分、去除空字符串、去除重复）
    searchKeywords = e.value.split(' ').filter(function (keyword,index,arr) {
      return keyword && keyword.trim() && arr.indexOf(keyword)==index
    });
    // 当数组不为空则执行搜索
    if (searchKeywords.length) {
      searchResult = '';
      searchResult_cate = '';
      searchResult_tag = '';
      searchTags = []
      // 遍历每个文章
      searchDb.forEach(post => {
        let content = post.content // 取出文本（用于高亮）
        let title = post.title // 取出标题（用于高亮）
        let cate = post.categories?post.categories:[] // 取出归类
        let tags = post.tags?post.tags:[] // 去除标签
        let contentStart = -1;
        let contentEnd = -1;
        let postHit = false; // 找到目标文章
        let hitContent = false; // 在内容中找到

        // 匹配
        searchKeywords.forEach(keyword => {

          // 文章内容
          if (content.indexOf(keyword)>-1) {
            postHit = true;
            hitContent = true;
            // 确定截取头尾
            if ( contentStart==-1 || contentStart>content.indexOf(keyword) ) {
              contentStart = content.indexOf(keyword)
            }else if ( contentEnd==-1 || contentEnd<(content.indexOf(keyword)+keyword.length) ){
              contentEnd = content.indexOf(keyword)+keyword.length
            }
          }
          // 文章标题
          if (title.indexOf(keyword)>-1) {
            postHit = true;
          }
          // 文章归类
          if (cate.length) {
            cate.forEach(c => {
              if (c.indexOf(keyword)>-1) {
                postHit=true;
                
              }
            });
          }
          // 文章归档
          if (tags.length) {
            tags.forEach(t => {
              if (c.indexOf(keyword)>-1) {
                postHit=true;
                searchTags.push(c);
              }
            })
          }
        });

        // 如果找到
        if (postHit) {
          if (hitContent) {
            // 截取
            (contentStart-10<0) ? contentStart = 0 : contentStart-=10
            (contentEnd+100>content.length) ? contentStart = content.length : contentStart+=100
            content = content.substring(contentStart, contentEnd)
          }
        }
      });
    }
  }
}

// 旧版搜索
function search(e) {
  // 若未加载数据库且未在加载
  if (searchDb==null&&searchDb_load==true) {
    searchDb_load=false;
    s_msg(e,"load");
    initializeSDB(e);
    searchDb_load=true;
  }
  // 当数据库存在、之前的搜索已经完成、输入值不为空
  if (searchDb!=null&&isNotSearching==true&&e.value.length>0) {
    isNotSearching=false;
    searchResult=document.createElement("div");
    searchResult.className="s_items";
    searchDb.forEach(searchItem => {
      ifHit=false;
      if (searchItem.title!=undefined&&searchItem.title.indexOf(e.value)>-1) {ifHit=true;}
      if (!ifHit&&searchItem.content!=undefined&&searchItem.content.indexOf(e.value)>-1) {ifHit=true;}
      if (!ifHit&&searchItem.tag!=undefined) {searchItem.tags.forEach(tag => {(tag.indexOf(e.value)>-1)?ifHit=true:"";});}
      if (!ifHit&&searchItem.categories!=undefined) {searchItem.categories.forEach(cat => {(cat.indexOf(e.value)>-1)?ifHit=true:"";});}
      if (ifHit) {
        const item = document.createElement("a");
        item.className = "item";
        item.setAttribute("href",searchItem.url)
        item.innerHTML='<div class="title">'+(searchItem.title!=undefined?searchItem.title:config.searchItemotitle)+'</div>';
        item.innerHTML += ((searchItem.content!=undefined&&searchItem.content!="")?'<div class="content">'+searchItem.content.replace(/<[^>]+>/g, "").slice(0,100)+'</div>':'');
        if ((searchItem.categories!=undefined&&searchItem.categories.length!=0)||(searchItem.tags!=undefined&&searchItem.tags.length!=0)) {
          searchTemp="";
          searchTemp+='<div class="more_info">';
          if (searchItem.tags!=undefined&&searchItem.tags.length!=0) {
            searchTemp+=(searchItem.tags.length==1?'<i class="'+config.icon_tag+'"></i>':'<i class="'+config.icon_tags+'"></i>');
            searchItem.tags.forEach(tag => {
              searchTemp+='<span class="tag">'+tag+' </span>';
            });
          }
          if ((searchItem.categories!=undefined&&searchItem.categories.length!=0)||(searchItem.tags!=undefined&&searchItem.tags.length!=0)) {searchTemp+='<div class="line_warp_h"></div>'}
          if (searchItem.categories!=undefined&&searchItem.categories.length!=0) {
            searchTemp+='<i class="'+config.icon_archive+'"></i>';
            searchItem.categories.forEach(cat => {
              searchTemp+='<span class="category">'+cat+' </span>';
            });
          }
          item.innerHTML+=searchTemp+'</div>';
        }
        searchResult.appendChild(item);
      }
    });
    // 当没有搜索到时
    if (searchResult.childElementCount==0) {
      (e.nextSibling.querySelector(".s_items")!=null)?e.nextSibling.querySelector(".s_items").remove():"";
      s_msg(e,"nothing");
    }else{
      s_msg(e,"remove");
      (e.nextSibling.querySelector(".s_items")!=null)?e.nextSibling.querySelector(".s_items").remove():"";
      e.nextSibling.appendChild(searchResult);
    }
    isNotSearching=true; // 恢复到空闲状态
  // 当输入为空时
  }else if (e.value.length==0) {
    (e.nextSibling.querySelector(".s_items")!=null)?e.nextSibling.querySelector(".s_items").remove():"";
  }
}
// 初始化搜索数据库
function initializeSDB(e) {
  var require = new XMLHttpRequest();
  require.open("get",config.searchDbHref);
  require.send(null);
  require.onload = function(){
    if(require.status == 200){
      searchDb = JSON.parse(require.responseText);
      s_msg(e,"remove");
      search(e);
      return;
    }else{
      searchDb_load=true;
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
  if (!saysItem) {
    saysTimeout=parseInt(document.querySelector(".index_items .item.say .contents").getAttribute("speed"));
    saysItem=document.querySelectorAll(".index_items .item.say .contents .content");
  }
  setTimeout(says, saysTimeout);

  !(document.querySelector(".index_items .item.say .contentBox").style.height)?document.querySelector(".index_items .item.say .contentBox").style.height=(saysItem[saysCount].offsetHeight+4)+'px':'';
  setTimeout(() => {
    document.querySelector(".index_items .item.say .contentBox").style.height=(saysItem[saysCount].offsetHeight)+'px';
    document.querySelector(".index_items .item.say .contents").style.transform='translateY('+(saysItem[saysCount].offsetTop)*-1+'px)';
    saysCount++;
    if (saysCount==saysItem.length) {
      saysCount=0;
    }
  }, 200);
}

var searchBar;

// 点击事件
function MousedownEvent(e) {
  if (config.searchBar&&!(e.target==searchBar||searchBar.contains(e.target))) {
    searchBar.querySelector(".navbar_inner.search").classList.remove('show');
  }
}


// 图册
function gallery() {
  document.querySelectorAll(".post_gallery").forEach(gallery => {
    // 准备元素和尺寸
    let galleryWidth = gallery.offsetWidth; // 框宽度
    let imgs = gallery.querySelectorAll("img"); //img 元素数组
    let imgSize = []; // 原始尺寸数组
    // 获取原始尺寸
    imgs.forEach(img => {
      let size = {};
      // 因 padding 故加 2
      size["width"]=img.naturalWidth + 2;
      size["height"]=img.naturalHeight + 2;
      imgSize.push(size);
    })

    // 开始计算合适的尺寸
    for (let index = 0; index < imgs.length; ) {
      // 计算其中一种数量情况
      calc:for (let amount = index; amount < imgs.length; amount++) {
        
        // 计算实际宽高比
        let realWidthRatio = []; // 宽高比数组
        let totalWidthRatio = 0; // 宽度基数
        for (let count = index; count <= amount; count++) {
          let realRatio = imgSize[count].width/imgSize[count].height;
          realWidthRatio.push(realRatio);
          totalWidthRatio+=realRatio;
        }
        // 使宽高比总和为一，这样宽高比就变成了站的总宽度的比
        for (let count = 0; count < realWidthRatio.length; count++) {
          realWidthRatio[count] = realWidthRatio[count]/totalWidthRatio;
        }
        
        // 实际高度（占宽比*目标宽度*原始高度/原始宽度）
        let realHeight = galleryWidth*realWidthRatio[0]*imgSize[index].height/imgSize[index].width
        // 判断实际高度是否在范围内（若已经排除其他可能，则直接设置）
        if ((index+1 == imgs.length)) {
          imgs[index].style.height='100%';
          index = amount + 1; // 使下次从下一个开始计数，非常重要，删去会导致死循环
          break calc;
        }else if (realHeight<=300) { //使用限制最小在宽度只容许一个图片的情况下会出现循环
          // 若符合，设置每一个元素的宽高
          for (let count = index; count <= amount; count++) {
            imgs[count].style.height=realHeight+'px';
          }
          index = amount + 1; // 使下次从下一个开始计数，非常重要，删去会导致死循环
          break calc;
        }
      }
    }
  })
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

  // resize 事件
  var doRunOnresize = false;
  window.onresize = function(){
    clearTimeout(doRunOnresize);
    doRunOnresize = setTimeout(function(){
      document.querySelector(".post_gallery")!=null && gallery();
    }, 1000);
  };
  
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
  function cleanSidebar() {
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

  cleanSidebar();
  updateTime();
  runtime();
  config.imgDesc && imgDes();
  archive();
  config.fooSt && sinceTo();
  figure();
  config.fooRt && runtimeFooter();
  config.tocSmJ && config.ifToc && (tocObj.length != 0) && tocjump();
  saysInit();
  config.searchBar && (searchBar=document.querySelector('.navbar.row'));

  gallery();

})