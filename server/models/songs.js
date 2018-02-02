var mongoose = require('mongoose');
var DB = mongoose.connect('mongodb://localhost:27017/blog');//红色为数据库名

//
mongoose.connection.on("open", function () {
    console.log("数据库连接成功");
});

//
mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败" + error);
});

//创建数据文档模板【在SQL数据库中 即一个表（列名字段等） NoSQL数据库中即数据文档（成员变量名）】
var testSchema = new mongoose.Schema({
    song: {type: String},
    singer: {type: String},
    cov: {type: String},
    url:{type: String},
    lrc:{type: String}
    // Address: {type: String},
    // timeDate: {type: Date, default: Date.now()}
},{ collection: "songs" });

module.exports = mongoose.model('Songs', testSchema);