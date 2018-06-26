/**
 * Created by jemond on 2018/6/26.
 */

var currentPage=1;
var pageSize=5;
var currentId;
var isDelete;


render()
function render(){
  $.ajax({
    type:'get',
    url:'/user/queryUser',
    data:{
      page:currentPage,
      pageSize:pageSize,
    },
    dataType:'json',
    success:function(info){
      //console.log(info);
      var tem=template('tmp',info);
      $('tbody').html(tem);
      //currentPage=info.page;

      //分页插件
      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:info.page,//当前页
        totalPages:Math.ceil(info.total/info.size),//总页数
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          currentPage=page;
          render()
        }
      });



    }
  })
}




//给表格按钮添加点击事件
$('tbody').on('click','.btn',function(){
  $('#userModal').modal('show');
  currentId=$(this).parent().data('id');
  isDelete=$(this).hasClass('btn-danger')?0:1;
})


//给模态框按钮添加点击事件
$('#submitBtn').click(function(){
  console.log(currentId);
  console.log(isDelete);
  $.ajax({
    type:'post',
    url:'/user/updateUser',
    data:{
      id:currentId,
      isDelete:isDelete,
    },
    dataType:'json',
    success:function(info){
      console.log(info)
      if(info.success){
      //  关闭模态框
        $('#userModal').modal('hide');
      //  重新渲染页面
        render(); 
      }
    }
  })
})
