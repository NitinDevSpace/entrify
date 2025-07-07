const express = require("express");
const User = require("../models/userModel");

const userRouter = express.Router(); // creates a router object ot handle routes for users (API Calls)

//register a new user
userRouter.post("/register", async (req, res) => {
	try {
		const userExists = await User.find({ email: req.body.email });
		if (userExists) {
			return res.send({
				success: false,
				message: "User already exists",
			});
		}
		const newUser = new User(req.body); // passing the data to user for creating a new user
		await newUser.save(); // then we need to save the new user to the database
		res.send({
			success: true,
			message: "Registered Successfully, Please Login",
		});
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
});

//login a user
userRouter.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message:"User not found, Please Register",
            })
        }
        if (req.body.password !== user.password) {
            return res.send({
                success: false,
                message:"Incorrect Password, Please Retry",
            })
        }
        res.send({
            success: true,
            message:"Logged In Successfully",
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

module.exports = userRouter;
