"use strict";

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];
    var decodedToken = jwt.verify(token, '47$a4ef727294f7$5e381b900$7def11dca_1620745541194');
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