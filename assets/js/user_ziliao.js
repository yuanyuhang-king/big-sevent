$(function(){
    // 自定义属性
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return "昵称长度必须在1~6位"
            }
        }
    })

    initUserInfo()

    // 定义一个初始化函数
    function initUserInfo(){
        $.ajax({
            method:'GET', 
            url: '/my/userinfo',
            success: function(res){
                if(res.status !==0){
                    return layer.msg('获取用户信息失败！')
                }
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置表单数据
    $('#btnreset').on('click',function(e) {
        e.preventDefault();
        initUserInfo()
    })

    // 提交用户信息的更改
    $('.layui-form').on('submit',function(e) {

        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
})