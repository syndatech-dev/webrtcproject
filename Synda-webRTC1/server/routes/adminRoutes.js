const express = require('express');
const path = require('path');
const router = express.Router();

// Middleware pour vérifier si l'utilisateur est admin
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Accès interdit : vous devez être un administrateur.');
    }
}

// Route pour le tableau de bord admin
router.get('/dashboard', isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../../admin/dashboard.html'));
});

// Route pour la gestion des utilisateurs
router.get('/users', isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../../admin/users.html'));
});

// Route pour la gestion des appels
router.get('/calls', isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../../admin/calls.html'));
});

// API pour récupérer les utilisateurs depuis la base de données
router.get('/api/users', isAdmin, (req, res) => {
    const users = require('../../database/users.json');
    res.json(users);
});

// API pour récupérer l'historique des appels
router.get('/api/calls', isAdmin, (req, res) => {
    const calls = require('../../database/calls.json');
    res.json(calls);
});

module.exports = router;
