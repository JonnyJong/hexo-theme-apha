hexo.extend.helper.register('recommendedPost', function(tags, posts){
  if (posts.length==1) {
    return;
  }
  
  return '<div class="recommend"></div>';
});