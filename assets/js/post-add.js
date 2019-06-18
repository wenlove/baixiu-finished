$(function() {

    //动态加载分类下拉
    (function() {
        $.ajax({
            type: 'get',
            url: '/getAllCategories',
            dataType: 'json',
            success(res) {
                var html = ''
                for (var i = 0; i < res.data.length; i++) {
                    html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
                }
                $('.cateSelector').html(html)
            }
        })
    })();

    //文件上传操作
    $('#feature').on('change', function() {

        var formData = new FormData()
        formData.append('img', this.files[0]);
        // formData.append('userName', 'tom')

        $.ajax({
            type: 'post',
            url: '/uploadFile',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success(res) {
                // console.log(res);
                if (res.code == 0) {
                    $('.thumbnail').attr('src', '/uploads/' + res.img).fadeIn(200);
                    //将文件路径存储到隐藏域中，方便serialize()方法获取
                    $('.featureImg').val('/uploads/' + res.img)
                } else {
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    $('.alert-danger span').html(res.des)
                }
            }
        })
    })

    //富文本框(richtextbox)插件的使用
    CKEDITOR.replace('content')

    //保存提交数据
    $('.btnOpt').on('click', function(e) {
        //富文本框数据同步到textarea
        //CKEDITOR.instances.id名.updateElement()
        CKEDITOR.instances.content.updateElement()

        //根据url是否有id判断新增、编辑
        if (id) {
            opt('/editPostById')
        } else {
            opt('/addPost')
        }
    })

    //封装实现文章新增和编辑的函数
    function opt(url) {
        $.ajax({
            type: 'post',
            url: url,
            data: $('form').serialize(),
            dataType: 'json',
            success(res) {
                // console.log(res);
                if (res.code == 0) {
                    $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                    $('.alert-danger span').html(res.des)

                    //页面跳转
                    setTimeout(() => {
                        location.href = '/admin/posts'
                    }, 2200);
                } else {
                    $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                    $('.alert-danger span').html(res.des)
                }
            }
        })
    }

    //调用common.js文件中的方法获取url中的id
    var id = itcast.getParameter(location.search).id;
    // console.log(id);
    if (id) {
        $.ajax({
            type: 'get',
            url: '/getPostById',
            data: { id },
            dataType: 'json',
            success(res) {
                // console.log(res);
                if (res.code == 0) {
                    var data = res.data
                    $('#id').val(data.id)
                    $('#title').val(data.title)
                    $('#content').val(data.content)
                    $('#slug').val(data.slug)
                    $('.featureImg').val(data.feature)
                    $('.thumbnail').attr('src', data.feature).show()
                    $('#category').val(data.category_id)
                    $('#created').val(data.created)
                    $('#status').val(data.status)

                    $('.page-title > h1').text('编辑文章')
                    $('.btnOpt').val('编辑')
                }
            }
        })
    }

})