$(function(){
    var form=layui.form;
    var layer=layui.layer;
    form.verify({
        nickname:function(){
            if(value>6){
                return '昵称必须在1-6个字符之间'
            }
        }

    })
    initUserinfo();
    function initUserinfo(){
        $.aja({
            method:'GET',
            URL:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户失败！')
                }
                form.val('formUserInfo',res.data)
            }
        })
    }
    //重置表单数据
    $('#btnReset').on('click',function(e){
        e.preventDefault();
        initUserinfo();
    })

    //监听表单的提交事件$
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户失败');
                }
                layer.msg('更新用户成功')
                window.parent.getUserInfo()
            }
            
        })
    })
})