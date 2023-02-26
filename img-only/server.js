//SALALILA, DAYNA MICAELA M

var express = require('express');
var multer = require('multer'); //middleware
var app = express();
var mime = require('mime-types');
var path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split('.')[file.originalname.split('.').length - 1]
    );
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' || ext !== '.jpg' || ext !== '.jpeg') {
      return cb(new Error());
    }
    cb(null, true);
  },
}).single('myFile');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/file-upload.html');
});

app.post('/uploads', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end('There was an error on the uploaded file format');
    }
    res.sendFile(__dirname + '/file-uploaded.html');
  });
});

app.listen(2000, function () {
  console.log('Server is running at port 2000...');
});
