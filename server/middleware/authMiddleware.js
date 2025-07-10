const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	try {
		//console.log("req header: ", req.headers.authorization);

		const token = req.headers["authorization"].split(" ")[1];
		//console.log("token: ", token);
		//console.log("JWT_SECRET:", process.env.JWT_SECRET);

		const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
		//console.log("verfiedtoken: ", verifiedToken);

		req.userId = verifiedToken.userId; //pulling out the user id from the token and sending to req body
		next();
	} catch (error) {
		res.status(401).send({ success: false, message: error.message });
	}
};

module.exports = auth;
