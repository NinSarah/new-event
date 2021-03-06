$(function () {
    // 自定义校验规则
    layui.form.verify({
        // 自定义的校验规则（验证两个密码框的值是否相等：如果相等则校验通过；否则校验失败！）
        rePwd: function (val) {
            // 获取到密码框的值
            const pwd = $('.reg-box [name="password"]').val().trim()
            if (pwd !== val) {
                // 两个密码框的值不一致
                return '输入的两次密码不一致！'
            }
            // 如果校验通过，不需要做任何处理
        },
        // 校验密码长度的验证规则
        pwd: [/^[\S]{6,15}$/, '密码的长度为6-15个字符，且不能包含空格！'],
        username: [/^[a-zA-Z0-9]{1,10}$/, '用户名为字母或数字的组合，且长度小于10！']
    })

    // 点击了去注册的链接
    $('#link-reg').on('click', function () {
        // 展示注册盒子
        $('.reg-box').show()
        // 隐藏登录盒子
        $('.login-box').hide()
    })

    // 点击了去登录的链接
    $('#link-login').on('click', function () {
        // 展示登录盒子
        $('.login-box').show()
        // 隐藏注册盒子
        $('.reg-box').hide()
    })

    // 为注册的表单绑定 submit 事件
    $('.reg-box form').on('submit', function (e) {
        // 1. 阻止表单的默认提交
        e.preventDefault()

        // 2. 发送 Ajax 请求
        $.ajax({
            type: 'POST',
            url: '/api/reg',
            data: $(this).serialize(),
            success: function (res) {
                // 注册成功!
                layer.msg('注册成功,请登录!')
                // 模拟"去登录"的点击行为
                $('#link-login').click()
            }
        })
    })

    // 为登录表单绑定 submit 事件
    $('.login-box form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 Ajax 的登录请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // 登录成功
                layer.msg('登录成功!')
                // 把得到的 token 的值,存储到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到 index.html 页面
                location.href = 'main.html'
            }
        })
    })
})