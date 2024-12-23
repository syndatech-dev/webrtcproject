const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const usersFile = path.join(__dirname, '../database/users.json');
const callsFile = path.join(__dirname, '../database/calls.json');

// Middleware pour vérifier si l'utilisateur est admin
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        res.status(403).send('Accès interdit : vous devez être un administrateur.');
    }
}

// Route pour le tableau de bord admin
router.get('/dashboard', isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dashboard.html'));
});

// Route pour la gestion des utilisateurs
router.get('/users', isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/users.html'));
});

// Route pour la gestion des utilisateurs
router.get('/history', isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/history.html'));
});
// API pour récupérer les utilisateurs depuis la base de données
router.get('/api/users', isAdmin, (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFile));
    res.json(users);
});

// API pour supprimer un utilisateur
router.delete('/api/users/:id', isAdmin, (req, res) => {
    let users = JSON.parse(fs.readFileSync(usersFile));
    users = users.filter(user => user.id !== req.params.id);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.json({ message: 'Utilisateur supprimé avec succès' });
});

// API pour récupérer l'historique des appels
router.get('/api/calls', isAdmin, (req, res) => {
    const calls = JSON.parse(fs.readFileSync(callsFile));
    res.json(calls);
});

module.exports = router;
