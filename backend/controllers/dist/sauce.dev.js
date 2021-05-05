"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sauce = require('../models/sauce');

var fs = require('fs'); // Récupération de l'ensemble des sauces 


exports.getAllSauces = function (req, res, next) {
  Sauce.find().then(function (sauces) {
    return res.status(200).json(sauces);
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
}; // Récupération d'une seule sauce 


exports.getOneSauce = function (req, res, next) {
  Sauce.findOne({
    _id: req.params.id
  }).then(function (sauce) {
    return res.status(200).json(sauce);
  })["catch"](function (error) {
    return res.status(404).json({
      error: error
    });
  });
}; // Création d'une sauce 


exports.createSauce = function (req, res, next) {
  var sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  var sauce = new Sauce(_objectSpread({}, sauceObject, {
    imageUrl: "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename)
  }));
  sauce.save().then(function () {
    return res.status(201).json({
      message: 'Sauce créée !'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
}; // Modification d'une sauce


exports.modifySauce = function (req, res, next) {
  var sauceObject = req.file ? _objectSpread({}, JSON.parse(req.body.sauce), {
    imageUrl: "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename)
  }) : _objectSpread({}, req.body);
  Sauce.updateOne({
    _id: req.params.id
  }, _objectSpread({}, sauceObject, {
    _id: req.params.id
  })).then(function () {
    return res.status(200).json({
      message: 'Sauce modifiée !'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
}; // Suppression d'une sauce 


exports.deleteSauce = function (req, res, next) {
  Sauce.findOne({
    _id: req.params.id
  }).then(function (sauce) {
    var filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink("images/".concat(filename), function () {
      Sauce.deleteOne({
        _id: req.params.id
      }).then(function () {
        return res.status(200).json({
          message: 'Sauce supprimée !'
        });
      })["catch"](function (error) {
        return res.status(400).json({
          error: error
        });
      });
    });
  })["catch"](function (error) {
    return res.status(500).json({
      error: error
    });
  });
};