const Bugs = require('../models/Bug');

async function showAll(req, res) {
    try {
        res.status(200).send(`You're in!`);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

module.exports = {
    showAll
}