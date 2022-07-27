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
  /**
   * 监听页面滚动
   */
  $(window).scroll(function(event){
    var pos = $(window).scrollTop()
    if(pos >= $(window).height()-80) {
      $('.scroll-top').show()
      $('.header').addClass('header-last')
    } else {
      $('.scroll-top').hide()
      $('.header').removeClass('header-last')
    }
  })
})