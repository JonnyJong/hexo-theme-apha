// 导航栏自动收起、
window.onscroll = function () {undefined

  var h = document.documentElement.scrollTop || document.body.scrollTop;

  // console.log(h * 2.5);      //控制台查看监听滚动  

  // var headerTop = document.getElementById("dao");//获取导航栏id

  // var navtext = document.getElementById("navtext");//获取导航栏中的文字id

  // var back = document.getElementById("cell-back");//获取导航栏中的返回图标icon id

  // if (h >= 42) {       //header的高度是40px;     

  //   headerTop.style.background = "#fff";

  //   headerTop.style.color = "rgba(66,65,66,1)";

  //   // 设置导航栏中的文字样式

  //   navtext.style.background = "#fff";

  //   navtext.style.color = "rgba(66,65,66,1)";

  //   // 设置导航栏中的返回图标icon样式

  //   back.style.background = "#fff";

  //   back.style.fill = "rgba(19,146,245,1)";

  // } else {undefined

  //   if (h < 10) {undefined

  //     //40*2.5=100;这样透明度就可以由0渐变到100%；

  //     headerTop.style.background = "rgba(255,255,255,0.0" + h * 2.5 + ")";

  //     headerTop.style.color = "rgba(66,66,66,0.0" + h * 2.5 + ")";

  //     navtext.style.background = "rgba(255,255,255,0.0" + h * 2.5 + ")";

  //     navtext.style.color = "rgba(66,66,66,0.0" + h * 2.5 + ")";

  //     back.style.background = "rgba(255,255,255,0.0" + h * 2.5 + ")";

  //     back.style.fill = "rgba(19,146,246,0.0" + h * 2.5 + ")";

  //   } else if (h > 10 && h <= 42) {undefined

  //     headerTop.style.background = "rgba(255,255,255,0." + h * 2.5 + ")";

  //     headerTop.style.color = "rgba(66,66,66,0." + h * 2.5 + ")";

  //     navtext.style.background = "rgba(255,255,255,0." + h * 2.5 + ")";

  //     navtext.style.color = "rgba(66,66,66,0." + h * 2.5 + ")";

  //     back.style.background = "rgba(255,255,255,0." + h * 2.5 + ")";

  //     back.style.fill = "rgba(19,146,245,0." + h * 2.5 + ")";
  //   }
  // }
};

// 随机色相
/* window.onload = function() {
  var hue = parseInt(Math.random()*360);
  document.documentElement.style.setProperty('--main-color', "hsl("+hue+", 100%, 29%)");
}; */