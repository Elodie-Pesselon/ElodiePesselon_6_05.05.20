"use strict";

var multer = require('multer');

var crypto = require('crypto');

var MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
var storage = multer.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, 'images');
  },
  filename: function filename(req, file, callback) {
    //const name = file.originalname.split(' ').join('_');
    var name = crypto.randomBytes(16).toString("hex") + '_'; // bytes = 8 booléeens aléatoires 

    var extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
module.exports = multer({
  storage: storage
}).single('image');