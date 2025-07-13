const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const EmailHelper = require("../utils/EmailHelper");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
	try {
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			return res.send({
				success: false,
				message: "User already exists",
			});
		}
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
		const newUser = new User({
			...req.body,
			password: hashedPassword,
		}); // passing the data to user for creating a new user
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

		if (!user) {
			return res.send({
				success: false,
				message: "User not found, Please Register",
			});
		}
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
		const isMatch = await bcrypt.compare(req.body.password, hashedPassword);
		if (!isMatch) {
			return res.send({
				success: false,
				message: "Invalid Password",
			});
		}
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		res.send({
			success: true,
			message: "Logged In Successfully",
			token: token,
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const getCurrentUser = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password"); //selects everything minus the passowrd
		res.send({
			success: true,
			message: "User is Authenticated",
			data: user,
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const forgetPassword = async (req, res) => {
	try {
		const { email } = req.body;
		if (email == undefined) {
			return res.status(401).send({
				success: false,
				message: "Enter email",
			});
		}

		let user = await User.findOne({ email: email });
		if (user == null) {
			return res.status(404).send({
				success: false,
				message: "User not found",
			});
		}
		if (user?.otp && Date.now() < user?.otpExpiry) {
			return res.status(401).send({
				success: false,
				message: "OTP exists check your inbox",
			});
		}
		const otp = Math.floor(Math.random() * 10000 + 9000);
		user.otp = otp;
		user.otpExpiry = Date.now() + 10 * 60 * 1000;
		await user.save();
		await EmailHelper("otp.html", email, {
			name: user.name,
			otp: user.otp,
		});

		res.status(200).send({
			success: true,
			message: "OTP sent to your Email",
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};

const resetPassword = async (req, res) => {
	try {
		const { password, otp } = req.body;
		if (password == undefined || otp == undefined) {
			return res.status(401).send({
				success: false,
				message: "invalid request",
			});
		}
		const user = await User.findOne({ otp: otp });
		if (user == null) {
			return res.status(404).send({
				success: false,
				message: "user not found",
			});
		}
		if (Date.now() > user.otpExpiry) {
			return res.status(401).json({
				success: false,
				message: "otp expired",
			});
		}
		user.password = password;
		user.otp = undefined;
		user.otpExpiry = undefined;
		await user.save();
		res.status(200).json({
			success: true,
			message: "password reset successfully",
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	register,
	login,
	getCurrentUser,
	forgetPassword,
	resetPassword,
};
