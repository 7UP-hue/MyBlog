$(function(){
  /**
   * 首页点击向下箭头页面滚动
   */
  $('.scroll-down').on('click', function(){
    $('html,body').animate({'scrollTop':$(window).height()-80},500)
  })
  /**
   * 点击回到顶部
   */
  $('.scroll-top').on('click', function(){
    $('html,body').animate({'scrollTop':$(window).height()-80},800)
  })
})