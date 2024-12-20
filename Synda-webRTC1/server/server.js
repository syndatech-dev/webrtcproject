const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const authRoutes = require('./auth');

// Middleware pour les cookies
app.use(cookieParser());

// Middleware pour le parsing des données
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour les sessions
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Middleware pour vérifier l'authentification
const authMiddleware = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        return res.redirect('/login.html');
    }
};

// Serveur les fichiers statiques
app.use(express.static(path.join(__dirname, '../assets')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Serveur les fichiers statiques
app.use(express.static(path.join(__dirname, '../assetsAdmin')));
app.use('/assetsAdmin', express.static(path.join(__dirname, '../assetsAdmin')));

// Serveur les fichiers statiques
app.use(express.static(path.join(__dirname, '../assetsAdmin')));
app.use('/assetsAdmin', express.static(path.join(__dirname, '../assetsAdmin')));


// Routes principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Routes principales
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/login.html'));
});


// Routes pour login et signup qui sont accessibles sans authentification
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/login.html'));
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/signup.html'));
});

// Routes pour login et signup qui sont accessibles sans authentification
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/signup.html'));
});
// Toutes les autres routes sous /client nécessitent une authentification
app.use('/client', authMiddleware, express.static(path.join(__dirname, '../client')));
// app.use('/admin', authMiddleware, express.static(path.join(__dirname, '../admin')));

app.get('/client/*', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html')); // ou la page d'erreur si le fichier n'existe pas
});

// app.get('/admin/*', authMiddleware, (req, res) => {
//     res.sendFile(path.join(__dirname, '../admin/login.html')); // ou la page d'erreur si le fichier n'existe pas
// });

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.redirect('/client'); // ou une page d'erreur si la session ne peut pas être détruite
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.redirect('/login.html');
    });
});

// Routes d'authentification
app.use('/api/auth', authRoutes);
app.use('/api/authAdmin', authRoutes);

// Lancer le serveur
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serveur WebRTC lancé sur http://localhost:${PORT}`);
});