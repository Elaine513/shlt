/**
 * Created by jemond on 2018/6/25.
 */

//5 如果用户没有登录，如要跳转到登录页面登录
  if(location.href.indexOf('login.html')===-1){
    $.ajax({
      type:'get',
      url:'/employee/checkRootLogin',
      dataType:'json',
      success:function(info){
        if(info.error===400){
          location.href="login.html"
        }
        if(info.success){
          console.log('当前用户已登录');
        }
      }
    })
  }




//实现进度条功能
// 第一个ajax发送时，开启进度条
$(document).ajaxStart(function(){
  NProgress.start();
})

$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },2000)
})

//公共功能

$(function(){

  //1 左边二级菜单切换显示
  $('.category').click(function(){
    $('.child').slideToggle()
  })

  //2 点击左边按钮侧边栏显示隐藏
  $('.lt_main .pull-left').click(function(){
    $('.lt_aside').toggleClass('hideMenu')
    $('.lt_main').toggleClass('hideMenu')
    $('.lt_topbar').toggleClass('hideMenu')
  })

//  3 退出按钮显示模态框
  $('.lt_topbar .pull-right').click(function(){
    $('#logoutModal').modal('show')
  })

//  4点击退出按钮，发送ajax请求，后台销毁登录信息
  $('#logoutBtn').click(function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        if(info.success){
          location.href="login.html"
        }
      }
    })
  })


})
