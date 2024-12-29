const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));

// Chemins des fichiers
const usersFile = path.join(__dirname, '../database/users.json');
const messagesFile = path.join(__dirname, '../database/messages.json');

// Fonction pour récupérer les utilisateurs
function getUsers() {
    if (fs.existsSync(usersFile)) {
        const data = fs.readFileSync(usersFile, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}

// Fonction pour récupérer les messages
function getMessages() {
    if (fs.existsSync(messagesFile)) {
        try {
            const data = fs.readFileSync(messagesFile, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Erreur de lecture du fichier messages.json :', error);
            return [];
        }
    }
    return [];
}

// Fonction pour sauvegarder les messages
function saveMessages(messages) {
    try {
        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
        console.log('Messages saved successfully');
    } catch (error) {
        console.error('Erreur de sauvegarde des messages :', error);
    }
}

// Middleware pour vérifier l'authentification
const authMiddleware = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/login');
};

const adminAuthMiddleware = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') return next();
    res.status(403).send('Accès non autorisé');
};

// Serveur des fichiers statiques
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/assetsAdmin', express.static(path.join(__dirname, '../assetsAdmin')));

// Routes principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/login.html'));
});

// Routes protégées pour les clients
app.use('/client', authMiddleware, express.static(path.join(__dirname, '../client')));
app.use('/accueil', authMiddleware, express.static(path.join(__dirname, '../client/accueil.html')));
app.use('/chat', authMiddleware, express.static(path.join(__dirname, '../client/chat.html')));
app.use('/audio-call', authMiddleware, express.static(path.join(__dirname, '../client/audio-call.html')));
app.get('/client/*', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Routes protégées pour les administrateurs
app.use('/admin/users', adminAuthMiddleware, express.static(path.join(__dirname, '../admin/users.html')));
app.use('/admin/dashboard', adminAuthMiddleware, express.static(path.join(__dirname, '../admin/dashboard.html')));
app.use('/admin/history', adminAuthMiddleware, express.static(path.join(__dirname, '../admin/history.html')));
app.use('/admin/settings', adminAuthMiddleware, express.static(path.join(__dirname, '../admin/settings.html')));

app.get('/admin/*', adminAuthMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dashboard.html'));
});

// Déconnexion
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) console.error('Session destruction error:', err);
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

app.get('/logoutA', (req, res) => {
    req.session.destroy(err => {
        if (err) console.error('Session destruction error:', err);
        res.clearCookie('connect.sid');
        res.redirect('/admin');
    });
});

// Gestion des utilisateurs connectés avec Socket.io
const connectedUsers = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Enregistrer l'utilisateur
    socket.on('register', (userId) => {
        connectedUsers[userId] = socket.id;
        console.log(`User ${userId} registered with socket ID ${socket.id}`);
    });

    // Gestion des offres WebRTC
    socket.on('offer', ({ offer, targetUser }) => {
        const targetSocketId = connectedUsers[targetUser];
        if (targetSocketId) io.to(targetSocketId).emit('offer', offer);
    });

    // Gestion des réponses WebRTC
    socket.on('answer', ({ answer, targetUser }) => {
        const targetSocketId = connectedUsers[targetUser];
        if (targetSocketId) io.to(targetSocketId).emit('answer', answer);
    });

    // Gestion des ICE candidates
    socket.on('ice-candidate', ({ candidate, targetUser }) => {
        const targetSocketId = connectedUsers[targetUser];
        if (targetSocketId) io.to(targetSocketId).emit('ice-candidate', candidate);
    });

    // Notifier le destinataire de l'appel
    socket.on('notify-call', ({ callerName, targetUser }) => {
        const targetSocketId = connectedUsers[targetUser];
        if (targetSocketId) {
            io.to(targetSocketId).emit('incoming-call', { callerName });
        }
    });

    // Enregistrer l'utilisateur pour le chat
    socket.on('register-user', (username) => {
        connectedUsers[socket.id] = { username, userId: socket.id };
        io.emit('update-user-list', Object.values(connectedUsers));
    });

    // Envoyer un message
    socket.on('chat-message', ({ targetUserId, message }) => {
        const sender = connectedUsers[socket.id];
        const targetSocketId = Object.keys(connectedUsers).find(key => connectedUsers[key].userId === targetUserId);

        // Sauvegarder le message
        const messages = getMessages();
        messages.push({
            sender: socket.id,
            receiver: targetUserId,
            content: message,
            timestamp: new Date().toISOString()
        });
        saveMessages(messages);

        // Envoyer le message au destinataire
        if (targetSocketId) {
            io.to(targetSocketId).emit('chat-message', {
                senderId: socket.id,
                username: sender.username,
                message,
                timestamp: new Date().toISOString()
            });
        }
    });

    // Gestion de la déconnexion
    socket.on('disconnect', () => {
        delete connectedUsers[socket.id];
        console.log('User disconnected:', socket.id);
    });
});

// Route pour récupérer les utilisateurs
app.get('/api/users', (req, res) => {
    const users = getUsers();
    const filteredUsers = users.filter(user => 
        user.id !== req.session.user.id && user.role !== 'admin' // Exclure l'utilisateur connecté et l'admin
    );
    res.json(filteredUsers);
});

// Route pour récupérer les messages
app.get('/api/messages', (req, res) => {
    const userId = req.query.userId;
    const messages = getMessages().filter(message => 
        message.sender === userId || message.receiver === userId
    );
    res.json(messages);
});

// Routes d'API
const adminRouter = require('./routes/adminRouter');
const { router: authRouter } = require('./auth');

app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);

// Lancer le serveur
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serveur WebRTC lancé sur http://localhost:${PORT}`);
});