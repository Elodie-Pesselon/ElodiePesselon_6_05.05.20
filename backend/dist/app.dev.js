"use strict";

// Importations (Express, Body-parser, Mongoose,etc.)
var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var path = require('path'); // Importation des routes


var sauceRoutes = require('./routes/sauce');

var userRoutes = require('./routes/user'); //Appel de la méthode Express :


var app = express(); // Connection de notre application à notre BDD mongoose

mongoose.connect('mongodb+srv://Elodie_Pesselon:LoveWebDev1206@cluster0.vxrnf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connexion à MongoDB réussie !');
})["catch"](function () {
  return console.log('Connexion à MongoDB échouée !');
}); // Ajout de headers à notre objet response pour éviter les erreurs CORS

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(express.json()); // Ajout d'un gestionnaire de routage pour gérer la ressource image

app.use('/images', express["static"](path.join(__dirname, 'images'))); // Enregistrement des routes : 

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes); //Exportation de l'application : 

module.exports = app;