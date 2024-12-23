const { saveCall, getUserCalls } = require('./utils/database');

function saveCallHistory(req, res) {
    const { userId, details } = req.body;
    saveCall(userId, details);
    res.status(200).send('Historique enregistré.');
}

function getCallHistory(req, res) {
    const { userId } = req.params;
    const calls = getUserCalls(userId);
    res.status(200).json(calls);
}

module.exports = { saveCallHistory, getCallHistory };
