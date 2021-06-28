//每次调用接口的时候，会先调用这个函数
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3008' + options.url
})