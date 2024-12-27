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
const adminRouter = require('./routes/adminRouter');

const { router: authRouter, adminAuthMiddleware } = require('./auth');

// Middleware pour les cookies
app.use(cookieParser());
// Middleware pour le parsing des données
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour les sessions
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Middleware pour vérifier l'authentification
const authMiddleware = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        return res.redirect('/login');
    }
};

// Serveur des fichiers statiques
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/assetsAdmin', express.static(path.join(__dirname, '../assetsAdmin')));

// Serveur des fichiers statiques
app.use(express.static(path.join(__dirname, '../assets')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.use(express.static(path.join(__dirname, '../assetsAdmin')));
app.use('/assetsAdmin', express.static(path.join(__dirname, '../assetsAdmin')));

// Routes principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/login.html'));
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/signup.html'));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/login.html'));
});





app.use('/admin/users', adminAuthMiddleware, express.static(path.join(__dirname, '../admin/users.html')));
app.use('/admin/dashboard', adminAuthMiddleware, express.static(path.join(__dirname, '../admin/dashboard.html')));
app.use('/admin/history', adminAuthMiddleware, express.static(path.join(__dirname, '../admin/history.html')));
app.use('/admin/settings', adminAuthMiddleware, express.static(path.join(__dirname, '../admin/settings.html')));


app.get('/loginA.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/login.html'));
});

// Routes protégées
app.use('/client', authMiddleware, express.static(path.join(__dirname, '../client')));
app.get('/client/*', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/admin', adminAuthMiddleware, express.static(path.join(__dirname, '../admin')));
app.get('/admin/*', adminAuthMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dashboard.html'));
});


// Déconnexion
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/client');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login.html');
    });
});

// Déconnexion
app.get('/logoutA', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/admin');
        }
        res.clearCookie('connect.sid');
        res.redirect('/loginA.html');
    });
});
app.use('/api/admin', adminRouter);
// Routes d'authentification
app.use('/api/auth', authRouter);

// Lancer le serveur
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serveur WebRTC lancé sur http://localhost:${PORT}`);
});
