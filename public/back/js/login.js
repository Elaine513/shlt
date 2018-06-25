/**
 * Created by jemond on 2018/6/25.
 */
/*
*1.进行表单交验验证
* 校验要求:
 *        (1) 用户名不能为空, 长度为2-6位
 *        (2) 密码不能为空, 长度为6-12位
 */
$(function(){
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{  //指定校验字段
      username:{
        validators:{  //配置校验规则
          notEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min:2,
            max:6,
            message:'用户名长度必须在2-6位'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{  //配置校验规则
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度必须在2-6位'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  })
})

/*
* 2使用ajax进行表单验证
 */
$(function(){
  $('#form').on("success.form.bv",function(e){
    e.preventDefault();  //阻止表单提交的默认行为
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
        //console.log(info)
        if(info.success){
          location.href="index.html"
        }
        if(info.error===1001){
          $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback")
        }
        if(info.error===1000){
          $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback")
        }
      }
    })
  })
})


/*
*3 重置表单
 */

$('[type="reset"]').click(function(){
  $('#form').data("bootstrapValidator").resetForm();
})

