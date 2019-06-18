$(function() {
    //分页数据页码与条数
    var pageSize = 4 //每页显示的条数
    var pageNum = 1 //当前页码

    function render(params) {
        var paramArr = [];
        //拼接参数
        Object.keys(params).forEach(key => {
            paramArr.push(key + '=' + params[key])
        })
        var url = '/getCommentsList?' + paramArr.join('&')

        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject('出错啦！！！')
                }
            }).then(res => {
                // console.log(res);
                var htmlStr = template('commentsListTmp', res.data);
                $('tbody').html(htmlStr);

                //加载分页
                setPagenator(Math.ceil(res.data.count / pageSize), render)
            })
    }
    render({
        "pageNum": pageNum,
        "pageSize": pageSize
    });

    //分页处理
    function setPagenator(count, callback) {
        // console.log(pageNum, count)
        $('.pagination').bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: pageNum,
            // 总页数
            totalPages: count,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function(event, originalEvent, type, page) {
                //当前页码
                pageNum = page;

                $('.chkAll').prop('checked', false);
                $('.btn-batch').fadeOut(200);
                //重新获取数据
                callback && callback({
                    "pageNum": pageNum,
                    "pageSize": pageSize
                })
            }
        })
    };

    //删除单条评论数据
    $('tbody').on('click', '.btnDel', function() {
        var id = $(this).data('id')
        fetch('/delCommentById', {
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
                throw new Error('出错啦！！！！！')
            }
        }).then(res => {
            if (res.code == 0) {
                $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                $('.alert-danger span').html(res.des)

                if (pageNum > 1) {
                    var chks = $('tbody input');
                    //判断是否是当前页的最后一条数据，如果是，则当前pageNum-1
                    if (chks.length == 1) {
                        pageNum -= 1
                    }
                } else {
                    pageNum = 1
                }
                render({
                    "pageNum": pageNum,
                    "pageSize": pageSize
                })
            } else {
                $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                $('.alert-danger span').html(res.des)
            }
        })
    });

    //全选、全不选
    $('.chkAll').on('click', function() {
        var value = $(this).prop('checked')
        $('tbody input').prop('checked', value)

        var allchk = $('tbody input:checked')
        if (allchk.length > 1) {
            $('.btn-batch').fadeIn(200)
        } else {
            $('.btn-batch').fadeOut(200)
        }
    });

    //单击复选框选择多个
    $('tbody').on('click', '.chkOne', function() {
        var chks = $('tbody input');
        var allchk = $('tbody input:checked');

        if (allchk.length == chks.length) {
            $('.chkAll').prop('checked', true)
        } else {
            $('.chkAll').prop('checked', false)
        }

        if (allchk.length > 1) {
            $('.btn-batch').fadeIn(200)
        } else {
            $('.btn-batch').fadeOut(200)
        }
    })

    //批量删除
    $('.btnDels').on('click', function() {
        var ids = []
        var allchk = $('tbody input:checked');
        var chks = $('tbody input');

        for (var i = 0; i < allchk.length; i++) {
            ids.push($(allchk[i]).data('id'))
        }
        // console.log(ids)

        fetch('/delsCommentsById', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.access_token
            },
            body: "ids=" + ids
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('出错啦！！！！！')
            }
        }).then(res => {
            if (res.code == 0) {
                $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                $('.alert-danger span').html(res.des)
                if ($('.chkAll').prop('checked')) {
                    $('.chkAll').prop('checked', false)
                }

                $('.btn-batch').fadeOut(200);

                //判断数据是否超过一页
                if (pageNum > 1) {
                    //判断选中的数据是否与此页的数据条数相等，如果是，则当前pageNum-1
                    if (chks.length == allchk.length) {
                        pageNum -= 1
                    }
                } else {
                    pageNum = 1
                }
                render({
                    "pageNum": pageNum,
                    "pageSize": pageSize
                })
            } else {
                $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                $('.alert-danger span').html(res.des)
            }
        })
    });

})