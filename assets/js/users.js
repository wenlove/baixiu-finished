$(function() {

    //获取所有用户数据渲染页面
    function render() {
        fetch('/getUsersList')
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return new Error('出错啦！！！！')
                }
            }).then(data => {
                // console.log(data);
                var htmlStr = template('usersListTemp', data)
                $('tbody').html(htmlStr)
            })
    }

    render();

    //上传头像图片
    $('#image').on('change', function() {
        var formdata = new FormData();
        formdata.append('img', this.files[0]);

        fetch('/uploadFile', {
            method: 'post',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',(这一句一定不能加，很多人容易忽略这个地方，否则就是上图的WebKitFormBoundary格式数据)
                'Authorization': 'Bearer ' + localStorage.access_token,
            },
            body: formdata
        }).then(res => {
            //判断请求是否成功
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject('出错啦！！！！！')
            }
        }).then(res => {
            if (res.code == 0) {
                $('.thumbnail').attr('src', '/uploads/' + res.img).fadeIn(200);
                //将文件路径存储到隐藏域中，方便serialize()方法获取
                $('.featureImg').val('/uploads/' + res.img)
            } else {
                $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                $('.alert-danger span').html(res.des)
            }
        })
    })

    //添加用户
    $('.btnAdd').on('click', function() {

        fetch('/addUsers', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.access_token,
            },
            body: $('form').serialize()
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return new Error('出错啦！！！')
            }
        }).then(res => {
            // console.log(res);
            if (res.code == 0) {
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                $('.alert-danger span').html(res.des)
                render()

                //添加成功清除表单数据
                $('form .form-control').val('')
                $('.thumbnail').fadeOut(200)
            } else {
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                $('.alert-danger span').html(res.des)
            }
        })
    });

    //删除单条数据
    $('tbody').on('click', '.btnDel', function() {
        var id = $(this).data('id');
        // console.log(id)
        fetch('/delUserById', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.access_token
            },
            body: "id=" + id
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject('出错啦！！！！！！！')
            }
        }).then(res => {
            if (res.code == 0) {
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                $('.alert-danger span').html(res.des)
                render()
            } else {
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                $('.alert-danger span').html(res.des)
            }
        })
    })

    //全选、全不选
    $('.chkAll').on('click', function() {
        var value = $(this).prop('checked')

        $('tbody input').prop('checked', value)
            //获取选中复选框数
        var allchks = $('tbody input:checked')

        //显示批量删除按钮
        if (allchks.length > 1) {
            $('.btnDels').fadeIn(200)
        } else {
            $('.btnDels').fadeOut(200)
        }
    })

    //单击复选框选择多项
    $('tbody').on('click', '.chkOne', function() {
        //获取所有复选框
        var chks = $('tbody input');
        //获取选中复选框数
        var allchks = $('tbody input:checked');
        //判断选中的复选框数与所有复选框数是否相等
        if (chks.length == allchks.length) {
            $('.chkAll').prop('checked', true)
        } else {
            $('.chkAll').prop('checked', false)
        }

        //显示批量删除按钮
        if (allchks.length > 1) {
            $('.btnDels').fadeIn(200)
        } else {
            $('.btnDels').fadeOut(200)
        }
    })

    //批量删除
    $('.btnDels').on('click', function() {
        var arr = [];

        var allchks = $('tbody input:checked');
        //把选中的复选框中的index添加到arr中
        for (var i = 0; i < allchks.length; i++) {
            arr.push($(allchks[i]).data('id'));
        }

        fetch('/delsUsersById', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.access_token
            },
            body: 'ids=' + arr
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Pormise.reject('出错啦！！！！！')
            }
        }).then(res => {
            if (res.code == 0) {
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                $('.alert-danger span').html(res.des)
                render()
            } else {
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                $('.alert-danger span').html(res.des)
            }
        }).catch(err => console.log(err))
    })
});