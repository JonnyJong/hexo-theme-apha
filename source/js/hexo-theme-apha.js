// 导航栏自动收起
window.onscroll = function(e){
  if (saveOffset == 'none') {
    saveOffset = window.pageYOffset;
    jsC_navFold = document.getElementById("jsConfig").classList.contains("jsC_navFold") ? true : false;
  }
  pcNavbar = document.getElementById("pcNavbar");
  var deltaT = saveOffset - window.pageYOffset;
  if (jsC_navFold && deltaT < 0) {
    pcNavbar.className = "navbar nav_hide";
  } else if (jsC_navFold && deltaT > 0) {
    pcNavbar.className = "navbar";
  }
  saveOffset = window.pageYOffset;
}

var saveOffset = 'none', pcNavbar, jsC_navFold;

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

// 随机色相
/* window.onload = function() {
  var hue = parseInt(Math.random()*360);
  document.documentElement.style.setProperty('--main-color', "hsl("+hue+", 100%, 29%)");
}; */

// 图片描述