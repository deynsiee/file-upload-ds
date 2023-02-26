/*
FILE UPLOAD JS FILE
SALALILA, DAYNA MICAELA M
WD-202
 */

var express = require('express');
var multer = require('multer'); //middleware
var app = express();
var path = require('path');
var mime = require('mime-types');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

//
var upload = multer({ storage: storage }).single('myfile');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/upload.html');
});

app.post('/uploads', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end('There was an error in uploading the file :(');
    }
    res.sendFile(__dirname + '/uploaded.html');
  });
});

app.listen(5000, function () {
  console.log('Server is running on port 5000...');
});
