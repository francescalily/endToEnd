const { Router } = require('express');
const usersController = require('../controllers/users.js');

const usersRouter = Router();

usersRouter.post("/login", usersController.login);
usersRouter.post("/register", usersController.register);
usersRouter.post("/logout", usersController.logout);


module.exports = usersRouter;