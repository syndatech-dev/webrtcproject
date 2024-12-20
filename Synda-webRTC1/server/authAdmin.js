const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const usersFile = path.join(__dirname, '../database/users.json');

// Fonction pour lire les utilisateurs
function getUsers() {
    return JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
}

// Route pour la connexion de l'admin
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    const user = users.find(u => u.username === username && u.role === 'admin');
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: "Identifiants incorrects pour l'administrateur" });
    }

    // Token JWT pour l'authentification
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({ message:"Administrateur connecté avec succès", token: token, redirect: '/admin/dashboard' });
});

// Middleware pour vérifier le jeton JWT de l'admin
function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "Jeton manquant" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Jeton non valide" });
        }
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Accès non autorisé pour non-admin" });
        }
        req.user = decoded;
        next();
    });
}

module.exports = { router, authMiddleware };