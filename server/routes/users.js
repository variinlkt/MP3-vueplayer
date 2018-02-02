var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// var User= require('../models/user.js');
var Songs= require('../models/songs.js');
var mongo = require('mongodb').MongoClient;
var multer  = require('multer');
var fs=require('fs');
var iconv=require('iconv-lite');
var upload = multer({ dest: 'uploads' });
// var uploadImg = multer({ dest: 'uploads/cov/' });
// var uploadImg = multer({ dest: 'uploads/cov/' });
// var storage = multer.diskStorage({
//     destination: function (req, file, cb){
//         //文件上传成功后会放入public下的upload文件夹
//         cb(null, './public/upload')
//     },
//     filename: function (req, file, cb){
//         //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
//         cb(null, file.originalname)
//     }
// });
router.get('/', function(req, res, next) {
   return res.send('total');
});

//reg page
// router.post('/nameCheck', function(req, res, next) {
//     User.count({'name':req.body.name}, function (err, total) {
//         if (err) {
//         	console.log(err);
//         	return res.send(err);
//         }
//         console.log(req.body.name,total);
//         if(total>0) return res.send(false);//已存在相同用户名
//         else return res.send(true);//用户名可以使用
//     });
// });

// router.post('/regSub',function(req,res,next){
// 	var md5=crypto.createHash('md5'),
// 		password=md5.update(req.body.psw).digest('hex');
// 	var userData=[{
// 		name:req.body.name,
// 		psw:password,
// 		email:req.body.email
// 	}];
// 	console.log(userData);
// 	User.create(userData,(err)=>{
// 		if(err) {
// 			console.log(err);
// 			return res.send(false);

// 		}
// 		return res.send(true);
// 	})
// });

// //login page
// router.post('/logSub',function(req,res,next){
// 	var md5=crypto.createHash('md5'),
// 		password=md5.update(req.body.psw).digest('hex');
	
// 	User.find({'name':req.body.name},function(err,resData){
// 		if(err) return next(err);
// 		// console.log(resData);
// 		if(resData){
// 			if(password==resData[0].psw){
				
// 				return res.send(true);
// 			}
// 		}
// 		return res.send(false);
// 	});
// })

//------------------add page----------------------
router.post('/uploadInfo', function (req, res, next) {
  let song=req.body.song;  
  let singer=req.body.singer;  
  let info=[{
  	song,
  	singer,
  	cov:'',
  	url:'',
  	lrc:''
  }];
  Songs.count({'song':song},(err,resData)=>{
  	if(err) return next(err);
	console.log(resData);
	if(resData){
		return res.send(false);
	}
	else{
		Songs.create(info,(err)=>{
			if(err) {
				console.error(err);
				return res.send(false);

			}
			return res.send(true);
		})
	}
  })
});

var iUpload=upload.single('file')
// var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
router.post('/uploadFiles', iUpload, function (req, res, next) {
  // req.files 是 `photos` 文件数组的信息
  // req.body 将具有文本域数据，如果存在的话
    // console.log(req.body);

    let fileName=req.file.originalname.split('.')[0],
        updateData;
    // console.log(req.file.mimetype);
    if(req.file.mimetype==='image/jpeg'){
    	updateData={cov:req.file.path}
    }else if(req.file.mimetype==='audio/mp3'){
    	updateData={url:req.file.path}
    }else{
    	updateData={lrc:req.file.path}
    }
    Songs.find({'song':fileName},function(err,resData){
		if(err) return console.error(err);
		if(resData.length){
			Songs.update({'song':fileName}, updateData, function(err,docs){
				if(err) return console.error(err);
			});
			return res.send(true);
		}
		return res.send(false);
	});
 //  var path=req.file.path;  
 //  return res.send(image);  
});

//------------------songs page----------------------
router.get('/showList',(req,res,next)=>{
	Songs.find({},function(err,resData){
		return res.send(resData);
	})
})
router.post('/delete',(req,res)=>{
	Songs.remove({'song':req.body.song},(err)=>{
		if(err) return console.error(err);
	})
	let file=req.body.url;
	let cov=req.body.cov;
	let lrc=req.body.lrc;
	fs.unlink('./uploads/'+file,(err)=>{
		console.error(err);
	})
	fs.unlink('./uploads/'+cov,(err)=>{
		console.error(err);
	})
	fs.unlink('./uploads/'+lrc,(err)=>{
		console.error(err);
	})
	return res.send(true);
})

//--------------lrc page----------------
router.post('/getLrc',(req,res)=>{
	let lrc=req.body.lrc;
	
	let fileStr=fs.readFileSync(lrc,{encoding:'binary'})
	let buf=new Buffer(fileStr,'binary')
	let str=iconv.decode(buf,'GBK')
    return res.send(str);
})


module.exports = router;
