$(function(){

    // 点击切换注册页面
    $('.q1').on('click',function(){
        $('#link_res').hide();
        $('#link_list').show();
    })
    // 点击进入登录页面
    $('.q2').on('click',function(){
        $('#link_list').hide();
        $('#link_res').show();
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd:[ /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'],

        rpwd:function(value){
            var aa =$('#link_list [name=password]').val();
            if(aa !==value) return '两次输入内容不一致'
        }
    })

    // 注册  post  获取数据
    $('#res-reg').on('submit',function(e){
        // 阻止表单的默认行为
      e.preventDefault();
        var data = {
            username :$('#res-reg [name=username]').val(),
            password : $('#res-reg [name=password]').val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser',data,function(res){
            if(res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功，请登录！')
            $('.q2').click();
        })
    })

    // 登录   获取数据
   $('#res_dl').on('submit',function (e) {
    e.preventDefault();
    $.ajax({
        url:'http://ajax.frontend.itheima.net/api/login',
        method:'POST',
        data: $(this).serialize(),
        success :function (res){
            console.log(res);
            if(res.status !==0) {
                return layer.msg ('登录失败！')
            }
             layer.msg('登录成功！')
            localStorage.setItem('token', res.token)
            location.href = '/home/index.html'
            }
    })
   })
})