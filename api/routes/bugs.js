const { Router } = require("express");
const bugsController = require("../controllers/bugs.js");
const authenticator = require("../middleware/authenticator.js");

const bugsRouter = Router();

bugsRouter.get("/", authenticator, bugsController.showAll);

bugsRouter.post("/", authenticator, bugsController.create);

bugsRouter.put("/:id", authenticator, bugsController.update);

bugsRouter.delete("/:id", authenticator, bugsController.destroy);

module.exports = bugsRouter;
