const User = require('../models/User');

async function register(req, res) {
    try {
        res.send(200).send('Registration Completed!');
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

async function login() {
    try {
        res.send(200).send('Login Completed!');
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}


module.exports = {
    register,
    login
}