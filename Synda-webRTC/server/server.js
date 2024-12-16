const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { authenticateUser, registerUser } = require('./auth');
const { saveCallHistory, getCallHistory } = require('./history');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurer les fichiers statiques
app.use('/admin', express.static(__dirname + '/../admin'));
app.use('/client', express.static(__dirname + '/../client'));

// Points d'API pour authentification et historique
app.use(express.json());
app.post('/api/register', registerUser);
app.post('/api/login', authenticateUser);
app.get('/api/history/:userId', getCallHistory);

// Socket.io pour la gestion des connexions en temps réel
io.on('connection', (socket) => {
    console.log('Nouvelle connexion :', socket.id);

    socket.on('signal', (data) => {
        socket.to(data.to).emit('signal', { from: socket.id, signal: data.signal });
    });

    socket.on('disconnect', () => {
        console.log('Déconnexion :', socket.id);
    });
});

// Servir les fichiers statiques pour login et signup
app.use('/client', express.static(__dirname + '/client'));

// Redirection par défaut vers la page de login
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/login.html');
});



const session = require('express-session');
const bodyParser = require('body-parser');

// Configuration de la session
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));

// Base de données fictive des utilisateurs (pour test uniquement)
const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'client1', password: 'client123' }
];

// Route pour traiter le login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = username;
        res.redirect('/client/acceuil.html'); // Redirection vers la page principale WebRTC
    } else {
        res.send('Identifiants invalides. <a href="/">Retour</a>');
    }
});

// Route pour logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Middleware pour protéger les pages
function authMiddleware(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

// Exemple de route protégée
app.get('/client/index.html', authMiddleware, (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
