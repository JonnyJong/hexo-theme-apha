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
  if (saveOffset == 'none') {
    saveOffset = window.pageYOffset;
  }
  pcNavbar = document.getElementById("pcNavbar");
  var deltaT = saveOffset - window.pageYOffset;
  if (deltaT < 0) {
    pcNavbar.className = "navbar nav_hide";
  } else if (deltaT > 0) {
    pcNavbar.className = "navbar";
  }
  saveOffset = window.pageYOffset;
}

var saveOffset = 'none', pcNavbar;

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

// 最后更新日期
function updateTime() {
  const lastTime = document.getElementById("last_update");
  const lastValue = new Date(lastTime.getAttribute("last_update_value")).getTime();
  lastTime.innerHTML = diffTime(lastValue, 3);
}

// 运行时长
function runtime() {
  // setTimeout(runtime, 1000);
  const runtimes = document.getElementById("runtime");
  const beginTime = new Date(runtimes.getAttribute("beginTime")).getTime();
  runtimes.innerHTML = diffTime(beginTime, 2);
}

// 随机色相
function randomColor() {
  var hue = parseInt(Math.random()*360);
  document.documentElement.style.setProperty('--main-color', "hsl("+hue+", 100%, 29%)");
};

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

//加载后运行
window.onload = function () {
  updateTime();
  runtime();
  config.imgDesc && imgDes();
}

config.randColor && randomColor();