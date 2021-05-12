// Importations (Express, Body-parser, Mongoose,etc.)
const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const path = require('path');
const helmet = require ('helmet');

// Importation des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//Appel de la méthode Express :
const app = express();

// Ajout de helmet pour protéger l'application de certaines vulnérabilités
app.use(helmet());

// Connection de notre application à notre BDD mongoose
mongoose.connect('mongodb+srv://DB_user:2XfPuj8dAMA3GZhV@cluster0.vxrnf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !')
);


// Ajout de headers à notre objet response pour éviter les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());


// Ajout d'un gestionnaire de routage pour gérer la ressource image
app.use('/images', express.static(path.join(__dirname, 'images')));


// Enregistrement des routes : 
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


//Exportation de l'application : 
module.exports = app;