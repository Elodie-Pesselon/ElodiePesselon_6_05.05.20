"use strict";

var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator'); // Création du schéma de données


var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);