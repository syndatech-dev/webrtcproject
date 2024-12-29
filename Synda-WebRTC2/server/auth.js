const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../database/users.json');

// Load users
// function getUsers() {
//     return JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
// }


function getUsers() {
    if (fs.existsSync(usersFile)) {
        const data = fs.readFileSync(usersFile, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}

// Signup
router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;
    const users = getUsers();

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "Nom d'utilisateur déjà existant" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
        id: Date.now().toString(),
        username,
        password: hashedPassword,
        role: role || 'client',
        createdAt: new Date().toISOString(),
        history: []
    });

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.json({ message: "Inscription réussie", redirectUrl: '/login' });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Identifiants incorrects" });
    }

    req.session.user = { id: user.id, username: user.username, role: user.role };

    if (user.role === 'admin') {
        res.json({ message: "Connexion réussie", redirect: '/admin/dashboard' });
    } else {
        res.json({ message: "Connexion réussie", redirect: '/client/accueil.html' });
    }
});

// Admin middleware
function adminAuthMiddleware(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') return next();
    res.status(403).json({ message: "Accès non autorisé Veillez vous connecter" });
}

module.exports = { router, adminAuthMiddleware };