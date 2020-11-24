$(function(){
    var form = layui.form
    var layer=layui.layer

    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,

        somepwd:function(value) {
            if(value === $('[name=oldPwd]').val()){
                return "新旧密码不能相同！"
            }
        },
        repwd:function(value){
            if(value!==$('[name = newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
        
    })


    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status !== 0){
                    return layer.msg('重置密码失败！')
                }
                layer.msg("重置密码成功！")
                $('.layui-form')[0].reset()
            }
        })
    })
})