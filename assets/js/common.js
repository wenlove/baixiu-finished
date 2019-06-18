var itcast = {
    getParameter(str) {
        var obj = {}
        var str = str.slice(1) //截取问号后面的参数
        var arr = str.split('&')
        for (var i = 0; i < arr.length; i++) {
            var temp = arr[i].split('=')
            obj[temp[0]] = temp[1]
        }
        return obj
    }
}