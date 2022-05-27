'use strict'
const $ = (()=>{

  // DOM 元素：导航栏
  var eNav
  // 上次滚动位置
  var lastScrollPosition
  // 正在滚动
  var doRunOnscroll = false

  function Navbar(){
    if (cfg.navbarMinScrollDist < window.window.pageYOffset) {
      eNav.classList.add('min')
    }else{
      eNav.classList.remove('min')
    }
    if (window.pageYOffset != 0) {
      eNav.classList.add("not-top")
    }else{
      eNav.classList.remove("not-top")
    }
    if ((lastScrollPosition - window.pageYOffset) < -4) {
      eNav.classList.add("down")
      eNav.classList.remove("up")
    } else if ((lastScrollPosition - window.pageYOffset) > 4) {
      eNav.classList.remove("down")
      eNav.classList.add("up")
    }
    lastScrollPosition = window.pageYOffset
  }

  function Init() {
    // console.log(' %c  Apha ' + ' %c  v'+config.version+' build '+config.build+'  ', 'color: #eee; background: #111; padding:8px 0;', 'background: #eee; padding:8px 0; color: #111; ')

    eNav = document.querySelector('nav')

    lastScrollPosition = window.pageYOffset

    Navbar()

    document.querySelectorAll('[ui-scroll-height]').forEach(e=>{
      e.style.setProperty('--scroll-height',e.scrollHeight+'px')
    })

    window.addEventListener('scroll', ()=>{
      if (doRunOnscroll) {return}
      doRunOnscroll = true
      setTimeout(() => {
        Navbar()
        doRunOnscroll = false
      }, 100)
    })

    console.log(' %c  Apha ' + ' %c  Ready  ', 'color: #eee; background: #111; padding:8px 0;', 'background: #eee; padding:8px 0; color: #111; ')
  }

  return {
    Init:()=>{Init()}
  }
})()
document.addEventListener('DOMContentLoaded', ()=>{
  // 初始化
  $.Init()
})