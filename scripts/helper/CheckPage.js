'use strict'
hexo.extend.helper.register('CheckPage', function(conditions){
  let result = true, inAllow = false, inRefuse = false, doCheckInAllow = false
  conditions.forEach(e => {
    if (e.indexOf('!') == 0) {
      switch (e.split(' ')[0]) {
        case '!home':
          if (this.is_home()) {inRefuse = true}
          break
        case '!page':
          if (this.is_page()) {inRefuse = true}
          break
        case '!post':
          if (this.is_post()) {inRefuse = true}
          break
        case '!archive':
          if (this.is_archive()) {inRefuse = true}
          break
        case '!year':
          if (this.is_year()) {inRefuse = true}
          break
        case '!month':
          if (this.is_month()) {inRefuse = true}
          break
        case '!category':
          if (e.split(' ')[1] != undefined) {
            if (this.is_category(e.split(' ')[1])) {
              inRefuse = true
            }
          }else if (this.is_category()){
            inRefuse = true
          }
          break
        case '!tag':
          if (e.split(' ')[1] != undefined) {
            if (this.is_tag(e.split(' ')[1])) {
              inRefuse = true
            }
          }else if (this.is_tag()){
            inRefuse = true
          }
          break
        case '!current':
          if (this.is_tag(e.split(' ')[1])) {inRefuse = true}
          break
      }
    }else{
      doCheckInAllow = true
      switch (e.split(' ')[0]) {
        case 'home':
          if (this.is_home()) {inAllow = true}
          break
        case 'page':
          if (this.is_page()) {inAllow = true}
          break
        case 'post':
          if (this.is_post()) {inAllow = true}
          break
        case 'archive':
          if (this.is_archive()) {inAllow = true}
          break
        case 'year':
          if (this.is_year()) {inAllow = true}
          break
        case 'month':
          if (this.is_month()) {inAllow = true}
          break
        case 'category':
          if (e.split(' ')[1] != undefined) {
            if (this.is_category(e.split(' ')[1])) {
              inAllow = true
            }
          }else if (this.is_category()){
            inAllow = true
          }
          break
        case 'tag':
          if (e.split(' ')[1] != undefined) {
            if (this.is_tag(e.split(' ')[1])) {
              inAllow = true
            }
          }else if (this.is_tag()){
            inAllow = true
          }
          break
        case 'current':
          if (this.is_tag(e.split(' ')[1])) {inAllow = true}
          break
      }
    }
  })
  result = (!inRefuse) && (doCheckInAllow ? inAllow : true)
  return result
})