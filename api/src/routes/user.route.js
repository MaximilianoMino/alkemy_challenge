const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const validateJWT = require("../middlewares/validate-jwt");

userRouter.get("/api/users", userController.getAllUsers);
userRouter.get("/api/users/:id", userController.getUserById);
userRouter.patch("/api/user/update/:id", userController.updateUser);
userRouter.delete("/api/user/delete/:id", userController.deleteUser);

module.exports = userRouter;
