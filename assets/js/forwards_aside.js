$(function() {
    $.ajax({
        type: 'get',
        url: '/getCommentsList',
        dataType: 'json',
        success(res) {
            // console.log(res);
            var htmlStr = template('commentListTMp', res.data)
            $('.discuz').html(htmlStr)
        }
    })
})