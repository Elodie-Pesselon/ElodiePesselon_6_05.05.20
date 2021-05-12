"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../middleware/auth');

var multer = require('../middleware/multer-config');

var sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router["delete"]('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrNot);
module.exports = router;