$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;

    //定义美化时间的过滤器
    template.dafalts.imports.dataFormt = function (data) {
        const dt = new Date(data)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth())
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    //定义补零
    function padZero(m) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()
    function initTable() {
        $.ajax({
            mothod: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                var htmlStr = template('tpl-lable'.res)
                $('tboy').html(htmlStr);
                renderPage(res.total)
            }
        })
    }
    function initCate() {
        $.ajax({
            mothod: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                var htmlStr = template('tpl-cate'.res)
                $('[naem=cate_id]').html(htmlStr)
                form.render();
            }
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault()

        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()

        q.cate_id = cate_id
        q.state = state
        initTable()

    })

    //定义分页的方法
    function renderPage(total) {
        laypage.render({
            elem: 'PageBox' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total //数据总数，从服务端得到
            , limit: q.pagesize
            , curr: q.pagenum
            , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
            , limits: [2, 3, 5, 10]
            //分页发生切换的时候，触发jump回调
            , jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                q.pagenum = obj.curr;
                // console.log(obj.limit); //得到每页显示的条数
                q.pagesize = obj.limit;
                //首次不执行
                if (!first) {
                    //do something
                    initTable()
                }
            }
        });
    }
    //通过代理的形式，为删除按钮绑定点击事件
    $('tboy').on('click', '.btn-delete', function () {
        var lenght=$('btn-delete').val()
        //eg1
        layer.confirm('确认删除', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/'+id,
                success: function(res) {
                  if (res.status !== 0) {
                    return layer.msg('删除文章失败！')
                  }
                  layer.msg('删除文章成功！')
                  if(len===1){
                    q.pagenum=q.pagenum===1?1:q.pagenum-1
                  }
                  initTable()
                }
              })

            layer.close(index);
        });
    })
})