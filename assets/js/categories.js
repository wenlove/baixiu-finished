$(function() {
    //获取所有数据
    function init() {
        $.ajax({
            type: 'get',
            url: '/getAllCategories',
            dataType: 'json',
            success(res) {
                // console.log(res);
                var htmlStr = template('cateListTmp', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    init();

    //局部渲染、显示提示信息
    function render(res) {
        if (res.code == 0) {
            $('.alert-danger span').html(res.des);
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)

            //局部重新渲染
            init()
        } else {
            $('.alert-danger span').html(res.des)
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
        }
    }

    //添加、编辑数据
    function opt(url) {
        $.ajax({
            type: 'post',
            url: url,
            data: $('form').serialize(),
            dataType: 'json',
            success(res) {
                // console.log(res);
                render(res)
            }
        })
    }

    //添加分类数据
    $('form').on('submit', function(e) {
        e.preventDefault(); //阻止form表单的默认提交行为
        if ($('.btnAdd').text() == '添加') {
            opt('/addCategory')
            $(this).find('input').val('')
        } else {
            opt('/editCategoryById')
        }

    })

    //编辑分类数据
    $('tbody').on('click', '.btnEdit', function() {
        var data = $(this).data()
        $('#name').val(data.name)
        $('#slug').val(data.slug)
        $('#id').val(data.id)
        $('.btnAdd').html('编辑')
    })

    //删除单条分类数据
    $('tbody').on('click', '.btnDel', function() {
        $.ajax({
            type: 'get',
            url: '/delCategoryById',
            data: { id: $(this).data('id') },
            dataType: 'json',
            success(res) {
                // console.log(res);
                render(res)
            }
        })
    })

    //全选、全不选
    $('.chkAll').on('click', function() {
        //使用prop方法控制复选框的状态变化
        var value = $(this).prop('checked')
        $('tbody .chkOne').prop('checked', value)
        var allChks = $('tbody .chkOne:checked')

        if (allChks.length > 1) {
            $('.btnDels').fadeIn(500)
        } else {
            $('.btnDels').fadeOut(500)
        }
    })

    // tbody中的复选框的单击操作
    $('tbody').on('click', '.chkOne', function() {
        //获取所有复选框
        var chks = $('tbody .chkOne');
        //获取已选中复选框
        var allChks = $('tbody .chkOne:checked');
        //判断全选是否选中
        if (chks.length == allChks.length) {
            $('.chkAll').prop('checked', true)
        } else {
            $('.chkAll').prop('checked', false)
        }

        //判断批量删除按钮是否显示
        if (allChks.length > 1) {
            $('.btnDels').fadeIn(500)
        } else {
            $('.btnDels').fadeOut(500)
        }
    })

    //批量删除
    $('.btnDels').on('click', function() {
        //创建一个空对象来存储需要删除项的id
        var ids = []
        var allChks = $('tbody .chkOne:checked');
        //使用for循环把id逐个追加到ids数组中
        for (var i = 0; i < allChks.length; i++) {
            ids.push($(allChks[i]).data('id'))
        }

        $.ajax({
            type: 'post',
            url: '/delsCategories',
            data: { ids: ids.join(',') },
            dataType: 'json',
            success(res) {
                // console.log(res);
                render(res)
            }
        })
    })
})