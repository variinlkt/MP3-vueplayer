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
router.get('/', function(req, res, next) {
   return res.send('total');
});
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
router.post('/uploadFiles', iUpload, function (req, res, next) {
  // req.files 是 `photos` 文件数组的信息 req.body 将具有文本域数据，如果存在的话
    let fileName=req.file.originalname.split('.')[0],
        updateData;
    console.log(req.file.mimetype);
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
//------------ctrls----------------
router.post('/next',(req,res)=>{
	let song=req.body.song
	Songs.find({'song':song}).sort({_id: 1}).limit(1).find((err,docs)=>{
		if(err) console.error(err)
		if(docs.length){
			console.log(docs)
		}
	})
})

module.exports = router;
