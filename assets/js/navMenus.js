$(function() {
    //获取所有导航数据
    function render() {
        $.ajax({
            type: 'get',
            url: '/getMenusList',
            dataType: 'json',
            success(res) {
                // console.log(res);
                var htmlStr = template('menusListTmp', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    render()

    //添加单条导航数据
    $('.btnAdd').on('click', function() {
        $.ajax({
            type: 'post',
            url: '/addMenu',
            data: $('form').serialize(),
            dataType: 'json',
            success(res) {
                // console.log(res);
                if (res.code == 0) {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').html(res.des)

                    //重新渲染
                    render()
                    $('.form-control').val('')
                } else {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').html(res.des)
                }
            }
        })
    })

    //删除单条导航数据
    $('tbody').on('click', '.btnDel', function() {
        $.ajax({
            type: 'post',
            url: '/delMenuByIndex',
            data: { index: $(this).data('index') },
            dataType: 'json',
            success(res) {
                // console.log(res);
                if (res.code == 0) {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').html(res.des)

                    //重新渲染
                    render()
                } else {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').html(res.des)
                }
            }
        })
    })

    //全选、全不选
    $('.chkAll').on('click', function() {
        var value = $(this).prop('checked')
        $('tbody input').prop('checked', value)

        var allchk = $('tbody input:checked')
        if (allchk.length > 1) {
            $('.btnDels').fadeIn(500)
        } else {
            $('.btnDels').fadeOut(500)
        }
    })

    //单击选中
    $('tbody').on('click', '.chkOne', function() {
        //获取所有复选框数量
        var chks = $('tbody input')

        //获取选中的复选框数量
        var allchk = $('tbody input:checked')

        if (chks.length == allchk.length) {
            $('.chkAll').prop('checked', true)
        } else {
            $('.chkAll').prop('checked', false)
        }

        if (allchk.length > 1) {
            $('.btnDels').fadeIn(500)
        } else {
            $('.btnDels').fadeOut(500)
        }
    })

    //批量删除导航数据
    $('.btnDels').on('click', function() {
        //创建一个空数组，用来存储选中的索引
        var indexs = []
        var allchk = $('tbody input:checked')
        for (var i = 0; i < allchk.length; i++) {
            indexs.push($(allchk[i]).data('index'))
        }
        // console.log(indexs);
        $.ajax({
            type: 'post',
            url: '/delsMenusByIndex',
            data: { indexs: indexs.join() },
            dataType: 'json',
            success(res) {
                // console.log(res);
                if (res.code == 0) {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').html(res.des)

                    //重新渲染
                    render()
                } else {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').html(res.des)
                }
            }
        })
    })
})