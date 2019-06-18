$(function() {

    //获取所有文章数据
    fetch('/getPosts')
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('出错啦')
            }
        }).then(res => {
            // console.log(res);
            if (res.code == 0) {
                var arr = res.data;
                $('.list-group-item').eq(0).find('strong').eq(0).html(arr.length);
                var newArr = arr.filter(v => {
                    if (v.status == 'drafted') {
                        return v;
                    }
                });
                $('.list-group-item').eq(0).find('strong').eq(1).html(newArr.length)
            }

        }).catch(err => console.log(err));

    //获取所有分类数据
    fetch('/getAllCategories')
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('出错啦')
            }
        }).then(res => {
            // console.log(res)
            // console.log(res.data.length)
            if (res.code == 0) {
                $('.list-group-item').eq(1).find('strong').html(res.data.length)
            }

        }).catch(err => console.log(err));

    //获取所有评论
    fetch('/getCommentsList')
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject('出错啦！！！！！')
            }
        }).then(res => {
            // console.log(res)
            if (res.code == 0) {
                var count = res.data.count;
                var arr = res.data.data;
                $('.list-group-item').eq(2).find('strong').eq(0).html(count);
                var newArr = arr.filter(v => {
                    if (v.status == 'held') {
                        return v;
                    }
                });
                $('.list-group-item').eq(2).find('strong').eq(1).html(newArr.length)
            }

        }).catch(err => console.log(err));
});