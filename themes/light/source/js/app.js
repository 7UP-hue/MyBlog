$(function(){
  /**
   * 首页点击向下箭头页面滚动
   */
  $('.scroll-down').on('click', function(){
    $('html,body').animate({'scrollTop':$(window).height()-40},500)
  })
  /**
   * 点击回到顶部
   */
  $('.scroll-top').on('click', function(){
    var currentPath = window.location.pathname
    if(currentPath === '/7UP-hue/' || currentPath === '/') {
      $('html,body').animate({'scrollTop':$(window).height()-80},800)
    }
    else {
      $('html,body').animate({'scrollTop':0},800)
    }
  })
  /**
   * 监听页面滚动
   */
  $(window).scroll(function(event){
    var currentPath = window.location.pathname
    var pos = $(window).scrollTop()
    if(currentPath === '/7UP-hue/' || currentPath === '/') {
        if(pos >= $(window).height()-80) {
        $('.scroll-top').show()
        $('.header').addClass('header-last')
      } else {
        $('.scroll-top').hide()
        $('.header').removeClass('header-last')
      }
    } 
    else {
      $('.scroll-top').show()
      $('.header').addClass('header-last')
    }
  })
})