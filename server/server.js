var express = require("express");
var app = express();
var fs = require("fs");

var bodyParser = require("body-parser");
var multer = require("multer");


// app.use(express.static("../public"));
app.use(bodyParser.urlencoded({extended: false}));
// 如果没有app.use(bodyParser.urlencoded({extended: false}))
//post请求需要 var urlencodedParser = bodyParser.urlencoded({extended: false});创建application/x-www-form-urlencoded 编码解析  且app.post('/process_post',urlencodedParser, function (req, res) {}
app.use(multer({dest: 'img/tmp'}).array("image"));


// app.get('/process_get', function (req, res) {
//     //输出 JSON 格式
//     var response = {
//         "first_name": req.query.first_name,
//         "last_name": req.query.last_name,
//         "_name": "name",
//     };
//
//     console.log(response);
//     res.send(JSON.stringify(response));
// });

app.get('/process_get', function (req, res) {
    //输出 JSON 格式

    res.redirect('http://itbilu.com/');
    // res.writeHead(301, {'Location': 'http://baidu.com/'});
    // console.log(res._header);
    res.end();
});
app.get('/process', function (req, res) {
    //输出 JSON 格式
    res.header("Content-Type", "application/json;charset=utf-8");

    var data = fs.readFileSync("goods.json");
    console.log("同步读取：" + data.toString());
    res.end(data.toString());
});

app.post('/process_post', function (req, res) {
    //输出JSON 格式
    // 在每个方法的头部加入
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    // ---------------------
    // 作者：Shuah153
    // 来源：CSDN
    // 原文：https://blog.csdn.net/weixin_36934930/article/details/79298097
    var response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };

    console.log(response);
    res.send(JSON.stringify(response));
});
var cors = require('cors');
app.use(cors({
    origin: ['http://192.168.199.149'],
    methods: ['GET', 'POST'],
    alloweHeaders: ['Conten-Type', 'Authorization']
}));
var cors = require('cors');
app.use(cors());
app.post('/process_post01', function (req, res) {
    //输出JSON 格式
    // 在每个方法的头部加入
    console.log(req.body);
    //在app.js里面修改,只有http://localhost可以访问请求，其他都为跨域，安全，需要启动一个本地服务
    // ---------------------
    // 作者：Shuah153
    // 来源：CSDN
    // 原文：https://blog.csdn.net/weixin_36934930/article/details/79298097
    var response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };

    console.log(response);
    res.send(JSON.stringify(response));
});

app.post('/file_upload', function (req, res) {
    console.log(req.files[0]);//上传的文件信息

    var des_file = __dirname + "/img/" + req.files[0].originalname;
    console.log("路径", __dirname + "/img/" + req.files[0].originalname);
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname,
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        })
    })
});
var server = app.listen('3001', function () {
    var address = require("os").networkInterfaces();
    var host = address.en0[1].address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
