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
var searchResult_tag; // 标签
var searchKeywords = [] // 搜索关键词
var searchTags = []
function search(e) {
  // 若未加载数据库且未在加载
  if (searchDb==null&&searchDb_load==true) {
    searchDb_load=false;
    searchMsg(e,"load");
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
      // searchResult_cate = '';
      searchResult_tag = '';
      searchTags = []
      // 遍历每个文章
      searchDb.forEach(post => {
        let content = post.content.replace(/\n/g, ' ').replace(/<[^>]+>/g, '') // 取出文本（用于高亮）
        let title = post.title?post.title:config.post_notitle // 取出标题（用于高亮）
        let cates = post.categories?post.categories:[] // 取出归类
        let tags = post.tags?post.tags:[] // 取出标签

        let contentStart = -1; // 内容截取开头
        let contentEnd = -1; // 内容截取结尾

        let hitContent = 0; // 在内容中找到
        let hitTitle = 0; // 在标题中找到
        let hitTags = 0; // 在标签中找到
        let hitCate = 0; // 在归类中找到

        // 匹配
        searchKeywords.forEach(keyword => {

          // 文章内容
          if (content.indexOf(keyword)>-1) {
            hitContent===0 ? hitContent = true : ''
            // 确定截取头尾
            if ( contentStart==-1 || contentStart>content.indexOf(keyword) ) {
              contentStart = content.indexOf(keyword)
            }
            if ( contentEnd==-1 || contentEnd<(content.indexOf(keyword)+keyword.length) ){
              contentEnd = content.indexOf(keyword)+keyword.length
            }
          }else{
            hitContent = false
          }

          // 文章标题
          if (title.indexOf(keyword)>-1) {
            hitTitle===0 ? hitTitle = true : ''
          }else{
            hitTitle = false
          }

          // 文章归类
          if (cates.length) {
            let ifHit = false
            cates.forEach(c => {
              if (c.indexOf(keyword)>-1) {
                ifHit = true;
              }
            });
            if (ifHit) {
              hitCate===0 ? hitCate = true : ''
            }else{
              hitCate = false
            }
          }

          // 文章标签
          if (tags.length) {
            let ifHit = false
            tags.forEach(t => {
              if (t.indexOf(keyword)>-1) {
                ifHit = true;
                searchTags.push(t);
              }
            })
            if (ifHit) {
              hitTags===0 ? hitTags = true : ''
            }else{
              hitTags = false
            }
          }
        });

        // 如果找到
        if (hitContent||hitTitle||hitCate||hitTags) {
          ifHit = true
          // 截取文章内容
          if (contentStart==-1) {
            contentStart=0
          }else{
            contentStart-=10
          }
          if (contentEnd==-1) {
            contentEnd=300
          }else{
            contentEnd+=300
          }
          if (contentEnd - contentStart > 400) {
            contentEnd = contentStart + 400
          }
          content = content.substring(contentStart, contentEnd)

          // 高亮
          searchKeywords.forEach(keyword => {
            let reg = new RegExp(keyword, 'g')
            content = content.replace(reg, '<span class="highlight">'+keyword+'</span>')
            title = title.replace(reg, '<span class="highlight">'+keyword+'</span>')
            if (hitCate) {
              cates.forEach(c => {
                c = c.replace(reg, '<span class="highlight">'+keyword+'</span>')
              })
            }
            if (hitTags) {
              tags.forEach(t => {
                t = t.replace(reg, '<span class="highlight">'+keyword+'</span>')
              })
            }
          });

          // 创建元素
          let element = '<a class="item" href="'+post.url+'"><div class="title">'+title+'</div><div class="content">'+content+'</div>'
          if (tags.length) {
            if (tags.length>1) {
              element+='<div class="tags"><i class="'+config.icon_tags+'"></i>'
            }else{
              element+='<div class="tags"><i class="'+config.icon_tag+'"></i>'
            }
            tags.forEach(t => {
              element+='<div class="tag">'+t+'</div>'
            })
            element+='</div>'
          }
          if (cates.length) {
            element+='<div class="cates"><i class="'+config.icon_categorie+'"></i>'
            cates.forEach(c => {
              element+=c+'/'
            })
            element+='</div>'
          }
          element+='</a>'
          searchResult+=element
        }
      });
      // 当有搜索结果时
      if (searchResult!=''||searchTags.length) {
        searchMsg(e,"remove");
        (e.nextSibling.querySelector(".searchItems")!=null)?e.nextSibling.querySelector(".searchItems").remove():"";
        (e.nextSibling.querySelector(".tag_results")!=null)?e.nextSibling.querySelector(".tag_results").remove():"";
        if (searchTags.length) {
          // 清理重复的标签
          searchTags = searchTags.filter(function (tag,index,arr) {
            return tag && tag.trim() && arr.indexOf(tag)==index
          });
          searchTags.forEach(tag => {
            searchResult_tag += '<a class="tag" href="'+config.link_root+config.link_tag_dir+'/'+tag+'"><i class="'+config.icon_tag+'"></i>'+tag+'</a>'
          });
          const inject = document.createElement("div")
          inject.className="tag_results"
          inject.innerHTML=searchResult_tag
          e.nextSibling.appendChild(inject);
        }
        if (searchResult) {
          const inject = document.createElement("div")
          inject.className="searchItems"
          inject.innerHTML=searchResult
          e.nextSibling.appendChild(inject);
        }
      }else{
        // 当没有搜索结果时
        (e.nextSibling.querySelector(".searchItems")!=null)?e.nextSibling.querySelector(".searchItems").remove():"";
        (e.nextSibling.querySelector(".tag_results")!=null)?e.nextSibling.querySelector(".tag_results").remove():"";
        searchMsg(e,"nothing");
      }
    }
  // 当输入框为空时清理结果区域
  }else if(searchDb!=null&&isNotSearching==true&&e.value.length==0){
    (e.nextSibling.querySelector(".searchItems")!=null)?e.nextSibling.querySelector(".searchItems").remove():"";
    (e.nextSibling.querySelector(".tag_results")!=null)?e.nextSibling.querySelector(".tag_results").remove():"";
    searchMsg(e,"remove");
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
      searchMsg(e,"remove");
      search(e);
      return;
    }else{
      searchDb_load=true;
      searchMsg(e,"failed");
      console.error("搜索数据库加载失败！Search DB failed to load!\n错误代码/code: "+require.status);
    }
  }
}
// 搜索消息
function searchMsg(e,type) {
  var text;
  switch (type) {
    case "load":
      text = config.searchMsg_load
      break;
    case "failed":
      text = config.searchMsg_failed
      break;
    case "nothing":
      text = config.searchMsg_nothing
      break;
    case "remove":
      e.nextSibling.querySelector(".searchMsg")!=null?e.nextSibling.querySelector(".searchMsg").remove():"";
      break;
  }
  if (e.nextSibling.querySelector(".searchMsg")==null) {
    const inject = document.createElement("div");
    inject.textContent = text;
    inject.className = "searchMsg";
    e.nextSibling.appendChild(inject);
  }else{
    e.nextSibling.querySelector(".searchMsg").innerText=text;
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

var searchBar 

// 点击事件
function MousedownEvent(e) {
  if (config.searchBar&&!(e.target==searchBar||searchBar.contains(e.target))) {
    searchBar.querySelector(".navbar_inner.search").classList.remove('show');
  }
  if (config.image_zoom&&document.querySelector('article').contains(e.target)&&e.target.tagName=='IMG'&&!e.target.classList.contains('dontZoom')) {
    imageZoom(e.target)
  }
  if (config.image_zoom&&e.target.className=='imageZoom'){
    document.querySelector('.imageZoom .image').style.cssText=document.querySelector('.imageZoom .image').getAttribute('ori')
    document.querySelector('.imageZoom').classList.add('out')
    document.body.classList.remove('fullscreen')
    setTimeout(() => {
      document.querySelector('.imageZoom').remove()
    }, 500);
  }
}

// 图片放大
function imageZoom(e){
  // 计算在屏幕上的位置和大小
  let top = e.offsetTop;
  let left = e.offsetLeft;
  let height = e.offsetHeight;
  let width = e.offsetWidth;
  let pare = e.offsetParent;
  let useHeight = height>= width
  while (pare != null) {
    top += pare.offsetTop;
    left += pare.offsetLeft;
    pare = pare.offsetParent;
  }
  top = top - window.pageYOffset;
  // 创建元素
  let inject = document.createElement('div')
  inject.className='imageZoom'
  let innerHTML = '<img class="image" alt="'+(e.getAttribute('alt')?e.getAttribute('alt'):'iamge')+'" src="'+e.getAttribute('src')+'" '
  if (useHeight) {
    innerHTML += 'style="top:'+top+'px;left:'+left+'px;height:'+height+'px;transform:translate(0%, 0%)" ori="top:'+top+'px;left:'+left+'px;height:'+height+'px;transform:translate(0%, 0%)"></img>'
  }else{
    innerHTML += 'style="top:'+top+'px;left:'+left+'px;width:'+width+'px;transform:translate(0%, 0%)" ori="top:'+top+'px;left:'+left+'px;width:'+width+'px;transform:translate(0%, 0%)"></img>'
  }
  innerHTML += (e.getAttribute('title')?('<div class="imageTitle">'+e.getAttribute('title')+'</div>'):'')
  inject.innerHTML = innerHTML;
  document.body.appendChild(inject);
  document.body.classList.add('fullscreen')
  // 动画
  setTimeout(() => {
    let box = document.querySelector('.imageZoom')
    let img = document.querySelector('.imageZoom .image')
    if (useHeight) {
      img.style.cssText='top:'+(box.offsetHeight/2)+'px;left:'+(box.offsetWidth/2)+'px;transform:translate(-50%, -50%);height:'+box.offsetHeight/5*4+'px;'
    }else{
      img.style.cssText='top:'+(box.offsetHeight/2)+'px;left:'+(box.offsetWidth/2)+'px;transform:translate(-50%, -50%);width:'+box.offsetWidth/5*4+'px;'
    }
  }, 100);
}

/**
 * 搜索功能
 */
 const $Search = (function() {
  var data = null
  var initializing = false
  var busy = false
  var element_input = null
  var element_result = null
  var searchKeywords
  var searchResult
  var searchResult_tag
  var searchTags
  function Initialize(){
    if (!data) {
      initializing = true
      Msg("loading")
      let require = new XMLHttpRequest()
      require.open("get",config.searchDbHref)
      require.send(null)
      require.onload = function(){
        if(require.status == 200){
          data = JSON.parse(require.responseText)
          Msg("remove")
          Search()
          initializing = false
          return
        }else{
          initializing = false
          Msg("load_failed")
          console.error("搜索数据库加载失败！Search DB failed to load!\n错误代码/code: "+require.status)
        }
      }
    }
  }
  function Search() {
    // 若未加载数据库且未在加载
    if (data==null&&initializing==false) {
      Initialize()
    }
    // 当数据库存在、之前的搜索已经完成、输入值不为空
    if (data!=null&&busy==false&&element_input.value.length>0) {
      // 初始化关键词（区分、去除空字符串、去除重复）
      searchKeywords = element_input.value.split(' ').filter(function (keyword,index,arr) {
        return keyword && keyword.trim() && arr.indexOf(keyword)==index
      });
      // 当数组不为空则执行搜索
      if (searchKeywords.length) {
        searchResult = '';
        // searchResult_cate = '';
        searchResult_tag = '';
        searchTags = []
        // 遍历每个文章
        data.forEach(post => {
          let content = post.content.replace(/\n/g, ' ').replace(/<[^>]+>/g, '') // 取出文本（用于高亮）
          let title = post.title?post.title:'无标题' // 取出标题（用于高亮）
          let cates = post.categories?post.categories:[] // 取出归类
          let tags = post.tags?post.tags:[] // 取出标签

          let contentStart = -1; // 内容截取开头
          let contentEnd = -1; // 内容截取结尾

          let hitContent = 0; // 在内容中找到
          let hitTitle = 0; // 在标题中找到
          let hitTags = 0; // 在标签中找到
          let hitCate = 0; // 在归类中找到

          // 匹配
          searchKeywords.forEach(keyword => {

            // 文章内容
            if (content.indexOf(keyword)>-1) {
              hitContent===0 ? hitContent = true : ''
              // 确定截取头尾
              if ( contentStart==-1 || contentStart>content.indexOf(keyword) ) {
                contentStart = content.indexOf(keyword)
              }
              if ( contentEnd==-1 || contentEnd<(content.indexOf(keyword)+keyword.length) ){
                contentEnd = content.indexOf(keyword)+keyword.length
              }
            }else{
              hitContent = false
            }

            // 文章标题
            if (title.indexOf(keyword)>-1) {
              hitTitle===0 ? hitTitle = true : ''
            }else{
              hitTitle = false
            }

            // 文章归类
            if (cates.length) {
              let ifHit = false
              cates.forEach(c => {
                if (c.indexOf(keyword)>-1) {
                  ifHit = true;
                }
              });
              if (ifHit) {
                hitCate===0 ? hitCate = true : ''
              }else{
                hitCate = false
              }
            }

            // 文章标签
            if (tags.length) {
              let ifHit = false
              tags.forEach(t => {
                if (t.indexOf(keyword)>-1) {
                  ifHit = true;
                  searchTags.push(t);
                }
              })
              if (ifHit) {
                hitTags===0 ? hitTags = true : ''
              }else{
                hitTags = false
              }
            }
          });

          // 如果找到
          if (hitContent||hitTitle||hitCate||hitTags) {
            ifHit = true
            // 截取文章内容
            if (contentStart==-1) {
              contentStart=0
            }else{
              contentStart-=10
            }
            if (contentEnd==-1) {
              contentEnd=300
            }else{
              contentEnd+=300
            }
            if (contentEnd - contentStart > 400) {
              contentEnd = contentStart + 400
            }
            content = content.substring(contentStart, contentEnd)

            // 高亮
            searchKeywords.forEach(keyword => {
              let reg = new RegExp(keyword, 'g')
              content = content.replace(reg, '<span class="highlight">'+keyword+'</span>')
              title = title.replace(reg, '<span class="highlight">'+keyword+'</span>')
              if (hitCate) {
                cates.forEach(c => {
                  c = c.replace(reg, '<span class="highlight">'+keyword+'</span>')
                })
              }
              if (hitTags) {
                tags.forEach(t => {
                  t = t.replace(reg, '<span class="highlight">'+keyword+'</span>')
                })
              }
            });

            // 创建元素
            let element = '<a class="item" href="'+post.url+'"><div class="title">'+title+'</div><div class="content">'+content+'</div>'
            if (cates.length) {
              element+='<div class="cates">'
              cates.forEach(c => {
                element+='<div class="cate">'+c+'</div>'
              })
              element+='</div>'
            }
            if (tags.length) {
              element+='<div class="tags">'
              tags.forEach(t => {
                element+='<div class="tag"># '+t+'</div>'
              })
              element+='</div>'
            }
            element+='</a>'
            searchResult+=element
          }
        });
        // 当有搜索结果时
        if (searchResult!=''||searchTags.length) {
          Msg("remove")
          if (searchTags.length) {
            // 清理重复的标签
            searchTags = searchTags.filter(function (tag,index,arr) {
              return tag && tag.trim() && arr.indexOf(tag)==index
            })
            searchTags.forEach(tag => {
              searchResult_tag += '<a class="tag" href="/tags/'+tag+'"># '+tag+'</a>'
            })
            const inject = document.createElement("div")
            inject.className="tag_results"
            inject.innerHTML=searchResult_tag
            element_result.appendChild(inject)
          }
          if (searchResult) {
            const inject = document.createElement("div")
            inject.className="searchItems"
            inject.innerHTML=searchResult
            element_result.appendChild(inject)
          }
        }else{
          // 当没有搜索结果时
          Msg("no_result")
        }
      }
    // 当输入框为空时清理结果区域
    }else if(data!=null&&initializing==false&&element_input.value.length==0){
      Msg("remove")
    }
  }
  function InitializeElement(){
    element_input = document.querySelector("body>.search input")
    element_result = document.querySelector("body>.search .searchResult")
  }
  function Msg(type){
    switch (type){
      case "loading":
        element_result.innerHTML = '<div class="msg">(。・ω・。)<br>正在载入搜索数据库</div>'
        break
      case "load_failed":
        element_result.innerHTML = '<div class="msg">( X﹏X )<br>载入数据库失败</div>'
        break
      case "no_result":
        element_result.innerHTML = '<div class="msg">( >_< )<br>找不到匹配的内容<br>请尝试减少或更换关键词</div>'
        break
      case "remove":
        element_result.innerHTML = ''
        break
    }
  }
  return {
    Initialize: function(){
      if (!initializing) {
        Initialize()
      }else{
        console.log('忙碌中：正在载入搜索数据库')
      }
    },
    InitializeElement: function(){
      InitializeElement()
    },
    Main: function(){
      Search();
    }
  }
})()

/**
 * 主方法
 */
 const $ = (function(){
  console.log(' %c  Apha ' + ' %c  v'+config.version+' build '+config.build+'  ', 'color: #eee; background: #111; padding:8px 0;', 'background: #eee; padding:8px 0; color: #111; ')

  /**
   * 变量
   */
  // 文章段落、文章段落据顶部距离、目录组件、目录窗口、目录处理忙碌
  var paragraph, paragraphOffsetTop = new Array(), tocObj, tocWindow, tocBusy = false
  // 滚动事件
  var doRunOnscroll = true
  // 上次滚动位置、横向导航栏
  var saveOffset, rowNavbar

  /**
   * 辅助方法
   */
  // 时间处理（间隔）
  function TimeProgress(inputTime, type) {
    const inputTimeAf = new Date(inputTime).getTime()
    const curDate = new Date().getTime()

    var diff = curDate- inputTimeAf

    var days=Math.floor(diff/86400000)
    var lvH=diff%86400000

    var h=Math.floor(lvH/3600000)
    var lvMin=lvH%3600000

    var min=Math.floor(lvMin/60000)
    var lvS=lvMin%60000;

    var s=Math.round(lvS/1000)

    switch (type) {
      case 1:
        return ((days==0) ? "" : days+" "+config.lang_days+" ") + ((h==0) ? "" : h+" "+config.lang_hours+" ") + ((min==0) ? "" : min+" "+config.lang_mins+" ") + ((s==0) ? "" : s+" "+config.lang_s)
      case 2:
        return ((days==0) ? "" : days+" "+config.lang_days+" ")
      case 3:
        return ((days!=0) ? days+" "+config.lang_days_b : ((h!=0) ? h+" "+config.lang_hours_b : ((min!=0) ? min+" "+config.lang_mins_b : s+" "+config.lang_s_b)))
      default:
        return
    }
  }
  // 目录点击
  function TocOnlick (link){
    let count = 0
    paragraph.forEach(e => {
      if (e == document.querySelector(link)) {
        window.scroll({ top: paragraphOffsetTop[count]-90, behavior: 'smooth' })
      }
      count++
    })
    history.pushState({},document.title,window.location.origin+window.location.pathname+link)
  }

  /**
   * 功能
   */
  // 最后更新时间
  function UpdateTime() {
    const lastTime = document.getElementById("last_update")
    if (lastTime) {
      const lastValue = new Date(lastTime.getAttribute("last_update_value")).getTime()
      lastTime.innerHTML = TimeProgress(lastValue, 3)
    }
  }
  // 运行时长
  function Runtime(){
    const runtimes = document.getElementById("runtime")
    if (runtimes) {
      const beginTime = new Date(runtimes.getAttribute("beginTime")).getTime()
      runtimes.innerHTML = TimeProgress(beginTime, 2)
    }
  }
  // 归档
  // 该方法将要废弃并转变为预处理方法 ******
  // 已转变为预处理，现保留此方法以便后续测试
  function Archive() {
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
  // 运行年份
  function SinceTo(){
    const s = document.getElementById("sinceTo");
    const sY = parseInt(s.getAttribute("since"));
    const nY = new Date().getFullYear();
    if (sY >= nY) {
      s.innerHTML = sY;
    }else{
      s.innerHTML = sY + " - " + nY
    }
  }
  // 代码块
  // 该方法将要废弃并转变为预处理方法 ******
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
  // 持续计算运行时长
  // 该方法可能需要转换为 辅助方法，以提高拓展性和可复用性
  function RuntimeFooter() {
    setTimeout(RuntimeFooter, 1000)
    const s = document.getElementById("runtimeFooter")
    const sT = new Date(s.getAttribute("begin")).getTime()
    s.innerHTML = TimeProgress(sT, 1)
    
  }
  // 目录
  function Toc() {
    if (tocBusy) {return}
    tocBusy = true
    // 准备
    // 可能需要减少计算高度的频率
    paragraphOffsetTop = []
    paragraph.forEach(item => {
      let finalOffsetTop = item.offsetTop
      let binElement = item.offsetParent
      while (binElement != null) {
        finalOffsetTop += binElement.offsetTop
        binElement = binElement.offsetParent
      }
      paragraphOffsetTop.push(finalOffsetTop)
    })
    // 执行
    let count = tocObj.length
    let countReal = count
    while (countReal > 0) {
      countReal--
      tocObj[countReal].className = "toc-link"
    }
    while (count > 0) {
      count--
      if ((paragraphOffsetTop[count] - window.pageYOffset) < 100) {
        break
      }
    }
    tocObj[count].className = "toc-link active"
    tocWindow.scroll({ top: tocObj[count].offsetTop-150, behavior: 'smooth' })
    tocBusy = false
  }
  // says
  function SaysInit() {
    if (document.querySelector(".index_items .item.say .contents")!=null) {
      says();
    }
  }
  // 自动隐藏快捷按钮
  function QuickBtnAutoHide(){
    window.pageYOffset>300?(document.querySelector(".quick_btn").classList.add("show")):""
    window.pageYOffset<=300?(document.querySelector(".quick_btn").classList.remove("show")):""
  }
  // 导航栏
  function NavFold() {
    if ((saveOffset - window.pageYOffset) < -4) {
      rowNavbar.classList.add("hide")
    } else if ((saveOffset - window.pageYOffset) > 4) {
      rowNavbar.classList.remove("hide")
    }
    saveOffset = window.pageYOffset;
  }
  // 图册
  function Gallery() {
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

  /**
   * 滚动
   */
  function runOnscroll() {
    config.navFold && NavFold()
    config.ifToc && tocObj.length>0 && Toc()
    config.ifQuickBtn && QuickBtnAutoHide()
  }

  /**
   * 初始化
   */
  function Init() {
    // 目录
    paragraph = document.querySelectorAll("article h1,article h2,article h3,article h4,article h5,article h6")
    tocObj = document.querySelectorAll(".sidebar_items .toc-link")
    tocWindow = document.querySelector(".sidebar_items .toc")
    // 导航栏
    saveOffset = window.pageYOffset
    rowNavbar = document.querySelector("nav.navbar.row")

    UpdateTime()
    Runtime()
    config.fooSt && SinceTo()
    figure()
    config.fooRt && RuntimeFooter()
    SaysInit()
    config.searchBar && (searchBar=document.querySelector('.navbar.row'))
    Gallery()
    config.ifToc && tocObj.length>0 && Toc()
    $Search.InitializeElement()

    /**
     * 滚动事件
     */
    window.addEventListener('scroll', ()=>{
      if (!doRunOnscroll) {return}
      doRunOnscroll = false
      setTimeout(() => {
        runOnscroll()
        doRunOnscroll = true
      }, 100)
    })

    /**
     * 调整大小事件
     */
    var doRunOnresize = false
    window.addEventListener('resize', ()=>{
      clearTimeout(doRunOnresize)
      doRunOnresize = setTimeout(function(){
        document.querySelector(".post_gallery")!=null && Gallery()
      }, 1000)
    })

    /**
     * 按钮事件
     */
    document.querySelectorAll('[data-btn]').forEach(button => {
      button.addEventListener('click', ev => {
        let e = ev.target
        switch (e.getAttribute('data-btn')){
          case 'search':
            $Search.Initialize()
            break
          default:
            console.warn('This button is not defined yet.\nbutton type: \n\t'+e.getAttribute('data-btn')+'\n button: ',e)
            break
        }
      })
    })
  }

  return{
    Init: function(){return Init()},
    TocOnlick: function(link){return TocOnlick(link)}
  }
  
})()

document.addEventListener('DOMContentLoaded', function () {
  // 初始化
  $.Init()
})