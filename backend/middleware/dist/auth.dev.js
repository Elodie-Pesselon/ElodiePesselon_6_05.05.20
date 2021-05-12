"use strict";

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];
    var decodedToken = jwt.verify(token, process.env.JWT_secret);
    var userId = decodedToken.userId;
    console.log(decodedToken);

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (_unused) {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};