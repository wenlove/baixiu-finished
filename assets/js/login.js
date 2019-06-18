$(function() {
    $('.btn').on('click', function() {

        $.ajax({
            type: 'post',
            url: '/login',
            data: $('form').serialize(),
            dataType: 'json',
            beforeSend: function() {
                var email = $('#email').val();
                var password = $('#password').val();
                var regEmail = /\w+[@]\w+[.]\w+/;
                // console.log(email);
                if (!regEmail.test(email)) {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').text('邮箱输入错误！')
                    return false;
                }
                if (!$.trim(password) || password.length < 6) {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').text('密码输入错误！')
                    return false;
                }

            },
            success(res) {
                // console.log(res);
                if (res.code == 0) {
                    location.href = '/admin'
                } else {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').text(res.des)
                }
            }
        })
    })
})