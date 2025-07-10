const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	try {
		const userExists = await User.findOne({ email: req.body.email });
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
};

const login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		if (!user) {
			return res.send({
				success: false,
				message: "User not found, Please Register",
			});
		}
		if (req.body.password !== user.password) {
			return res.send({
				success: false,
				message: "Incorrect Email/Password, Please Retry",
			});
		}
		res.send({
			success: true,
			message: "Logged In Successfully",
			token: token,
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = { register, login };
