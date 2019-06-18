$(function() {
    //上传图片
    $('#logo').on('change', function() {
        var formData = new FormData()
        formData.append('img', this.files[0]);

        fetch('/uploadFile', {
            method: 'post',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',(这一句一定不能加，很多人容易忽略这个地方，否则就是上图的WebKitFormBoundary格式数据)
                'Authorization': 'Bearer ' + localStorage.access_token,
            },
            body: formData,
        }).then(function(res) {
            return res.json()
        }).then((res) => {
            // console.log(res);
            if (res.code == 0) {
                $('.logo').attr('src', '/uploads/' + res.img).fadeIn(200);
                //将文件路径存储到隐藏域中，方便serialize()方法获取
                $('#site_logo').val('/uploads/' + res.img)
            } else {
                $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                $('.alert-danger span').html(res.des)
            }
        })
    })
})