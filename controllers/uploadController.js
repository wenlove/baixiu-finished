const formidable = require('formidable')
const path = require('path')

module.exports = {
    uploadFile(req, res) {
        //创建文件上传对象
        var form = new formidable.IncomingForm()

        //设置参数编码
        form.encoding = 'utf-8'

        //设置文件上传存储目录
        form.uploadDir = './uploads';
        // form.uploadDir = __dirname + '/../uploads'

        //设置是否保留文件扩展名、后缀名，默认为false
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            // console.log(fields);
            // console.log(files);
            // console.log(files.img.path);
            // console.log(path.basename(files.img.path));
            if (err) return res.json({
                code: 1,
                des: '上传文件失败'
            })
            res.json({
                code: 0,
                des: '上传文件成功',
                // basename:可以获取路径中最后一个\后面的内容
                img: path.basename(files.img.path)
            })
        })
    }
}