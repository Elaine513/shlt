/**
 * Created by jemond on 2018/6/26.
 */

//1 进入页面，发送Ajax请求，获取数据，渲染页面
$(function(){
  var currentpage=1;
  var pageSize=2;

  //渲染页面
  render()
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentpage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info)
        var htmlStr=template('tmp',info);
        $('tbody').html(htmlStr);

      //  分页功能
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentpage=page;
            render()
          }
        });
      }
    })
  }

// 2 添加分类功能
  $('#addBtn').click(function(){
      $('#addModal').modal('show');
  })
//
// 3 表单校验功能
  $('#addForm').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'一级分类名称不能为空'
          }
        }
      }
    }
  })


//  4添加按钮添加分类
  $('#addForm').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('#addForm').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info)
        if(info.success){
          //render();
          //隐藏模态框
          $('#addModal').modal('hide');
          //重新渲染
          currentpage=1;
          render();
          //重置表单
          $('#addForm').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })
})