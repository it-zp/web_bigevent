$(function () {
    var form = layui.form
    initCate()
    // 初始化富文本编辑器
    initEditor()
    function initCate() {
        $.ajax({
            mothod: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                var htmlStr = template('tpl-cate'.res)
                $('[naem=cate_id]').html(htmlStr)
                form.render();
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //为选择封面的按钮，绑定点击事件处理函数
    $('#btnChoseImage').on('click', function () {
        $('#coverFile').click()
    })

    //监听coverFile的change事件，获取用户选择的文件列表
    $('#coverFile').on('change', function (e) {
        var files = e.targer.files

        if (files.length) {
            return
        }
        var newImgURL = URL.createObjectURL(file[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    var art_state = '已发布'

    $('#btnSaver2').on('click', function () {
        art_state = '草稿'
    })
    $('#form-pub').on('submit', function () {
        e.preventDefault()
        var fd = new FormData($(this)[0])

        fd.append = ('state', art_state)

        // fd.forEach(function(k,v){
        //     console.log(k,v)
        // })
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)

                publishArticle(fd)
            })
    })
    function publishArticle(fd) {
        $.ajax({
            mothod: 'POST',
            url: '/my/article/add',
            contemtType: false,
            proessData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                location.href = 'article/art_list.html';
            }
        })
    }
})