const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser'); // Ajout de cookie-parser pour gérer les cookies
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const authRoutes = require('./auth'); // Vérifiez le chemin de votre fichier auth.js

// Middleware pour les cookies
app.use(cookieParser());

// Middleware pour le parsing des données
app.use(express.json());  // Traiter le corps des requêtes JSON
app.use(bodyParser.urlencoded({ extended: true })); // Traiter le corps des requêtes URL-encoded

// Middleware pour les sessions
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));




// Routes principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/client', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '../client/index.html'));
    } else {
        res.redirect('/login.html');
    }
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/signup.html'));  // Redirection vers la page signup
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/login.html'));  // Redirection vers la page login
});
app.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/login.html'));  // Redirection vers la page login
});

// Serveur les fichiers statiques
app.use(express.static(path.join(__dirname, '../client')));
app.use('/client', express.static(path.join(__dirname, '../client')));

// app.use(express.static(path.join(__dirname, '../client')));



// Routes d'authentification
app.use('/api/auth', authRoutes);

// Lancer le serveur
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serveur WebRTC lancé sur http://localhost:${PORT}`);
});





