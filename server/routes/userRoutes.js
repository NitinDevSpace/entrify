const express = require("express");
const User = require("../models/userModel");
const {
	register,
	login,
	getCurrentUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware")

const userRouter = express.Router(); // creates a router object ot handle routes for users (API Calls)

//register a new user
userRouter.post("/register", register);

//login a user
userRouter.post("/login", login);

//Get the current user
userRouter.get("/get-current-user", authMiddleware, getCurrentUser);

module.exports = userRouter;
