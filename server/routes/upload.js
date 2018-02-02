var express = require('express');
var router = express.Router();

// var uploadFolder=require(../)


router.get('/nameCheck', function(req, res, next) {
   return res.send('total');
});
router.post('/file', function(req, res, next) {
    console.log('req.body');

    console.log(req.body);
      console.log(req.files);

      console.log(req.files.file_data.path);
});



module.exports = router;
