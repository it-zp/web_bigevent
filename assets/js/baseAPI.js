$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // console.log(options.url);
    // 统一为有权限的接口，设置haeders请求头
    if (options.url.indexOf('/my' !== -1)) {
        options.haeders = {
            authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href('/login.html')
        }
    }
})