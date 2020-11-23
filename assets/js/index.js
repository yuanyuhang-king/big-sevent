$(function(){
    getUserInfo()
})

 // 获取用户的信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
    //     headers: {
    //         Authorization:localStorage.getItem('token')||''
    //    },
        success:function(res){
           if(res.status !== 0){
               return layui.layer.msg('获取用户信息失败！')
           }
           renderAvatar(res.data)
        },

        // complete:function(res){
        //     if(res.responseJSON.status ===1 &&res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token');
        //         location.href ='/home/login.html'
        //     }

        // }
    })
}

// 渲染用户信息
function renderAvatar(user){
    // 1.获取用户的名称
    var name = user.nickname||user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.渲染图片信息
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        var frist = name[0].toUpperCase() ;
        $('.text-avatar').html(frist).show();
    }
}



// 退出功能的开发
var layer = layui.layer
$('#btn-logoout').on('click',function(){

    layer.confirm('确认退出登录吗？', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token')
        location.href = '/home/login.html'
        layer.close(index);
      });
})