
$(function(){
    getUserInfo();
//退出功能
    $('#btnloginout').on('click',function(){
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href='/login.html';

            layer.close(index);

          });
    })

    
    
})

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // Headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
            // console.log(res);
            if(res.status!==0){

                return layui.layer.mag('获取信息失败');
            }
            renderAvatar(res.data)
        },
        // complete:function(res){
        //     if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
        //         localStorage.removeItem('token');
        //         location.href('/login.html')
        //     }
        // }

    })
}
//渲染用户头像
function renderAvatar(user){
    var name =user.nickname ||user.username
    $('#welcome').html('欢迎'+name);
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide()
        // toUpperCase()设置大写
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show();
    }
}