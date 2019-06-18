$(function() {
    $.ajax({
        type: 'get',
        url: '/getMenusList',
        dataType: 'json',
        success(res) {
            // console.log(res);
            var htmlStr = template('menusListTmp', res)
            $('.topnav ul').html(htmlStr)
            $('.nav').html(htmlStr)
        }
    })
})