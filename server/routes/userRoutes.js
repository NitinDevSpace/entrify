const express = require("express");
const User = require("../models/userModel");
const { register, login } = require("../controllers/userController");

const userRouter = express.Router(); // creates a router object ot handle routes for users (API Calls)

//register a new user
userRouter.post("/register", register);

//login a user
userRouter.post('/login', login)

module.exports = userRouter;
