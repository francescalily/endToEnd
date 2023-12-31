const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcrypt");

async function register(req, res) {
    const data = req.body;
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    data["password"] = await bcrypt.hash(data["password"], salt);
    const result = await User.create(data);

    res.status(201).send(result);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function login(req, res) {
    const data = req.body;
    console.log(data);
    try {
        const user = await User.getOneByUsername(data.username);
        console.log("User", user);
        const authenticated = await bcrypt.compare(data.password, user["password"]);
        console.log("Authenticated", authenticated);
    
        if (!authenticated) {
            throw new Error("Incorrect credentials.");
        } else {
            const token = await Token.create(user.user_id);
            console.log(token);
            res.status(200).json({ authenticated: true, token: token.token });
        }
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
    } catch (err) {
        res.status(403).json({ err: err.message });
    }
}


module.exports = {
    register,
    login,
    logout
}
