$(function() {
    //分页数据页码与条数
    var pageSize = 3 //每页显示的条数
    var pageNum = 1 //当前页码

    //获取所有数据
    function render(obj = {}) {
        $.ajax({
            type: 'get',
            url: '/getPostsList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                // ...就是展开运算符，它可以将对象的成员展开为一个一个属性
                ...obj
            },
            dataType: 'json',
            success(res) {
                // console.log(res);
                //获取所有数据
                var htmlStr = template('postsListTmp', res.data)
                $('tbody').html(htmlStr)

                //判断是否有数据，如果没有数据，则不调用分页处理函数
                if (Math.ceil(res.data.count / pageSize)) {
                    setPagenator(Math.ceil(res.data.count / pageSize), render)
                } else {
                    $(".pagination").html("")
                }
            }
        })
    }
    render()

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
                pageNum = page

                //重新获取数据
                callback && callback()
            }
        })
    };

    //动态加载分类下拉
    (function() {
        $.ajax({
            type: 'get',
            url: '/getAllCategories',
            dataType: 'json',
            success(res) {
                var html = '<option value="all">所有分类</option>'
                for (var i = 0; i < res.data.length; i++) {
                    html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
                }
                $('.cateSelector').html(html)
            }
        })
    })();

    //筛选
    $('.btnSift').on('click', function(e) {
        //获取用户数据
        var category_id = $('.cateSelector').val()
        var status = $('.statusSelector').val();
        //创建一个空对象用来添加属性
        var obj = {}
        if (category_id != 'all') {
            obj['category_id'] = category_id
        }

        if (status != 'all') {
            obj['status'] = status
        }
        // console.log(obj);
        //筛选成功，重新渲染并回到第一页
        pageNum = 1;
        //获取用户所选择的条件，调用方法查询数据
        render(obj)
    })


    //删除单条数据
    $('tbody').on('click', '.btnDel', function() {
        $.ajax({
            type: 'post',
            url: '/delPostsList',
            data: {
                id: $(this).data('id')
            },
            dataType: 'json',
            success(res) {
                // console.log(res);
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
            $('.btndels').fadeIn(500)
        } else {
            $('.btndels').fadeOut(500)
        }
    })

    //单击选中
    $('tbody').on('click', '.chkOne', function() {
        var chks = $('tbody input')
        var allchk = $('tbody input:checked')
        if (chks.length == allchk.length) {
            $('.chkAll').prop('checked', true)
        } else {
            $('.chkAll').prop('checked', false)
        }

        if (allchk.length > 1) {
            $('.btndels').fadeIn(500)
        } else {
            $('.btndels').fadeOut(500)
        }
    })

    //批量删除操作
    $('.btndels').on('click', function() {
        var ids = []
        var chks = $('tbody input')
        var allchk = $('tbody input:checked')

        for (var i = 0; i < allchk.length; i++) {
            ids.push($(allchk[i]).data('id'))
        }
        // console.log(ids);
        $.ajax({
            type: 'post',
            url: '/delsPostsLists',
            data: { ids: ids.join() },
            dataType: 'json',
            success(res) {
                // console.log(res);
                if (res.code == 0) {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').html(res.des)
                    if ($('.chkAll').prop('checked')) {
                        $('.chkAll').prop('checked', false)
                    }

                    $('.btndels').fadeOut(500)

                    //判断数据是否超过一页
                    if (pageNum > 1) {
                        //判断选中的数据是否与此页的数据条数相等，如果是，则当前pageNum-1
                        if (chks.length == allchk.length) {
                            pageNum -= 1
                        }
                    } else {
                        pageNum = 1
                    }
                    render()
                } else {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').html(res.des)
                }
            }
        })
    })

})