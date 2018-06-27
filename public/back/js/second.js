/**
 * Created by jemond on 2018/6/26.
 */

$(function(){
  var currentPage=1;
  var pageSize=5;
//  1 前端发送Ajax请求，并通过模板引擎渲染页面
  render()
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info)
        var str=template('tmp',info);
        $('tbody').html(str)


      //  分页渲染
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage=page;
            render();

          }
        });
      }
    })
  }


//  2点击按钮显示模态框

  $('#addBtn').click(function(){
    $('#secondModal').modal('show');
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100,
      },
      dataType:'json',
      success:function(info){
        //console.log(info);
        var str=template('tpl',info);
        $('.dropdown-menu').html(str);
      }
    })
  })


//  3点击按钮显示
  $('.dropdown-menu').on('click','a',function(){
    var txt=$(this).text();
    $('#firstCate').text(txt);

    var id=$(this).data('id');
    $('[name=categoryId]').val(id);

    $('#form2').data('bootstrapValidator').updateStatus('categoryId','VALID')
  })


//  4配置file-upload回调函数
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    //图片上传完成的回调函数
    done:function (e, data) {
      console.log(data.result.picAddr);
      var picUrl=data.result.picAddr;
      $('#imgBox').attr('src',picUrl)
      $('[name=brandLogo]').val(picUrl)
      $('#form2').data('bootstrapValidator').updateStatus('brandLogo','VALID')
    }

  });

  //5通过表单校验插件实现表单校验功能
  $('#form2').bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一级分类',
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类名称',
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传图片',
          }
        }
      }
    }

  })


//  6注册表单校验成功时间，阻止默认提交，用Ajax就提交
  $('#form2').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('#form2').serialize(),
      dataType:'json',
      success:function(info){
        if(info.success){
          $('#secondModal').modal('hide');
          $('#form2').data('bootstrapValidator').resetForm(true);
          currentPage=1;
          render();
          $('#firstCate').text('请选择一级分类');
          $('#imgBox img').attr('src','images/none.png')
        }
      }
    })
  })



})