// 导航栏自动收起
window.onscroll = function(e){
  if (saveOffset == 'none') {
    saveOffset = window.pageYOffset;
  }
  if (jsC_navFold == 'none') {
    jsC_navFold = document.getElementById("jsConfig").classList.contains("jsC_navFold") ? true : false;
  }
  navbar = document.getElementById("navbar");
  var deltaT = saveOffset - window.pageYOffset;
  if (jsC_navFold && deltaT < 0) {
    navbar.className = "navbar nav_hide";
  } else if (jsC_navFold && deltaT > 0) {
    navbar.className = "navbar";
  }
  saveOffset = window.pageYOffset;
}

var saveOffset = 'none';
var navbar;
var jsC_navFold = 'none';

// 随机色相
/* window.onload = function() {
  var hue = parseInt(Math.random()*360);
  document.documentElement.style.setProperty('--main-color', "hsl("+hue+", 100%, 29%)");
}; */

// 图片描述