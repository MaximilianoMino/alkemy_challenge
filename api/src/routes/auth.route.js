const express = require("express");
const loginController = require("../controllers/login.controller");
const authRouter = express.Router();

authRouter.post("/api/auth/login", loginController.login);
authRouter.post("/api/auth/singin", loginController.singin);

module.exports = authRouter;
