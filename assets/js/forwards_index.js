$(function() {
    //获取轮播图数据
    $.ajax({
        type: 'get',
        url: '/getSliderList',
        dataType: 'json',
        success(res) {
            if (res.code == 0) {
                var htmlStr = template('sliderListTmp', res)
                $('.swipe-wrapper').html(htmlStr)

                //动态创建小圆点
                var lis = $('.swipe-wrapper li')
                for (var i = 0; i < lis.length; i++) {
                    $('.cursor').append('<span></span>')
                }
                $('.cursor span').eq(0).attr('class', 'active')

                var swiper = Swipe(document.querySelector('.swipe'), {
                    auto: 3000,
                    transitionEnd: function(index) {
                        // index++;

                        $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
                    }
                });

                // 上/下一张
                $('.swipe .arrow').on('click', function() {
                    var _this = $(this);

                    if (_this.is('.prev')) {
                        swiper.prev();
                    } else if (_this.is('.next')) {
                        swiper.next();
                    }
                })
            }
        }
    })

    var pageSize = 10 //每页显示的条数
    var pageNum = 1 //当前页码

    //获取所有文章数据
    $.ajax({
        type: 'get',
        url: '/getPosts',
        dataType: 'json',
        success(res) {
            // console.log(res);
            var htmlStr = template('postsListTmp', res)
            $('.new').html(htmlStr)
        }
    })
})