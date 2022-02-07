// 手机端打开菜单
function nav_menu_btn() {
  if (mblNavbar == "none"){
    mblNavbar = document.getElementById("mblNavbar");
    mblNavBakCover = document.getElementById("nav_menu_cover");
  }
  if (mblNavbar.className == "navbar"){
    mblNavbar.className = "navbar show";
    mblNavBakCover.className = "nav_menu_cover show";
  }else{
    mblNavbar.className = "navbar";
    mblNavBakCover.className = "nav_menu_cover";
  }
}
var mblNavbar = 'none', mblNavBakCover;

// 代码复制按钮
function figureCpBtn(which) {
  const icon = document.querySelectorAll("figcaption i")[which];
  window.getSelection().selectAllChildren(document.querySelectorAll("figure")[which].querySelectorAll(".code")[0])
  document.execCommand ("Copy");
  window.getSelection().removeAllRanges();
  icon.className = "fa fa-check";
  setTimeout(() => {
    icon.className = "fa fa-clipboard";
  }, 2000);
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
        return ((days==0) ? "" : days+" 天 ") + ((h==0) ? "" : h+" 小时 ") + ((min==0) ? "" : min+" 分钟 ") + ((s==0) ? "" : s+" 秒");
      case 2:
        return ((days==0) ? "" : days+" 天 ");
      case 3:
        return ((days!=0) ? days+" 天前" : ((h!=0) ? h+" 小时前" : ((min!=0) ? min+" 分钟前" : s+" 秒前")))
      default:
        return;
    }
    
  }

  // 导航栏自动收起
  window.onscroll = config.navFold && function(e){
    if ((saveOffset - window.pageYOffset) < -4) {
      pcNavbar.className = "navbar nav_hide";
    } else if ((saveOffset - window.pageYOffset) > 4) {
      pcNavbar.className = "navbar";
    }
    saveOffset = window.pageYOffset;
  }
  var saveOffset = window.pageYOffset;
  var pcNavbar = document.getElementById("pcNavbar");

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
  function copyBtn(item, count){
    const injectBtn = document.createElement("i");
    const head = item.querySelectorAll("figcaption")[0]
    injectBtn.setAttribute("onclick", "figureCpBtn(" + count + ");");
    injectBtn.className = "fa fa-clipboard";
    head.insertBefore(injectBtn, head.lastChild.nextSibling);
  }
  function figure() {
    const items = document.querySelectorAll("figure.highlight");
    var count = 0;
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
      config.cpBtn && copyBtn(item, count++);
    });
  }

  updateTime();
  runtime();
  config.imgDesc && imgDes();
  archive();
  config.fooSt && sinceTo();
  figure();
  config.fooRt && runtimeFooter();

})