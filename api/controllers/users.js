const User = require('../models/User');

async function register(req, res) {
    try {
        const data = req.body;

        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        data["password"] = await bcrypt.hash(data["password"], salt);

        const result = await User.create(data);

        res.status(201).send(result);

    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

async function login(req, res) {
    try {
        const data = req.body;
        const user = await User.getOneByUsername(data.username);
        const authenticated = await bcrypt.compare(data.password, user["password"]);

        if (!authenticated) {
            throw new Error("Incorrect Credentials!");
        }
        else {
            const token = await Token.create(user.id);
            res.status(200).json({ authenticated: true, token: token.token });
        }

        res.send(200).send('Login Completed!');
    } catch (err) {
        res.status(403).json({ err: err.message });
    }
}

async function logout(req, res) {
    try {
        const data = req.body;
        const token = await Token.getOneByToken(data.token);

        const response = await token.deleteToken();

        if (response == data.token) {
            res.status(200).json({ logged_out: true });
        }

        res.send(200).send('Login Completed!');
    } catch (err) {
        res.status(403).json({ err: err.message });
    }
}


module.exports = {
    register,
    login,
    logout
}