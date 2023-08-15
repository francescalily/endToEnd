const { Router } = require('express');
const bugsController = require('../controllers/bugs.js');
const authenticator = require('../middleware/authenticator.js');

const bugsRouter = Router();

bugsRouter.get("/", bugsController.showAll);

module.exports = bugsRouter;