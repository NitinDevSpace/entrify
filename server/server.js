const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();
app.set("trust proxy", 1);
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");


require("dotenv").config(); // LOADS ENV VARIABLES INTO PROCESS.ENV

const connectDB = require("./config/db");
connectDB();

const stripeWebhookRoutes = require("./routes/stripeWebhook");

app.use(
	"/api/stripe",
	express.raw({ type: "application/json" }),
	stripeWebhookRoutes
);

const apiLimited = rateLimit({
	windowMs: 2 * 60 * 1000,
	max: 30,
	handler: (req, res, next) => {
		// Calculate seconds remaining
		const resetTimestamp = req.rateLimit.resetTime
			? req.rateLimit.resetTime.getTime()
			: Date.now() + req.rateLimit.windowMs;
		const secondsRemaining = Math.ceil((resetTimestamp - Date.now()) / 1000);

		const minutesRemaining = Math.ceil(secondsRemaining / 60);

		res.status(429).json({
			success: false,
			message: `Too many requests from this IP. Please try again after ${minutesRemaining} minute(s).`,
		});
	},
});

const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));

app.use(helmet());
app.use(express.json());
// app.use(
// 	"/api",
// 	mongoSanitize({
// 		replaceWith: "_",
// 		// This disables query and params sanitizing entirely
// 		sanitizeQuery: false,
// 		sanitizeParams: false,
// 		allowDots: true,
// 		onSanitize: ({ req, key }) => {
// 			console.warn(`Sanitized: ${key}`);
// 		},
// 	})
// );

// Custom Content Security Policy (CSP) configuration
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (unsafe)
			imgSrc: ["'self'", "data:", "example.com"], // Allow images from 'self', data URLs, and example.com
			connectSrc: ["'self'", "api.example.com"], // Allow connections to 'self' and api.example.com
			fontSrc: ["'self'", "fonts.gstatic.com"], // Allow fonts from 'self' and fonts.gstatic.com
			objectSrc: ["'none'"], // Disallow object, embed, and applet elements
			upgradeInsecureRequests: null, // Upgrade insecure requests to HTTPS
		},
	})
);


//Importing routes
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theaterRouter = require("./routes/theaterRoutes");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const auth = require("./middleware/authMiddleware");

// Routes/API calls
app.use("/api/", apiLimited);
app.use("/api/users", userRouter);
app.use("/api/movies", auth, movieRouter);
app.use("/api/theaters", auth, theaterRouter);
app.use("/api/shows", auth, showRouter);
app.use("/api/bookings", auth, bookingRouter);
// app.get("*", (req, res) => {
// 	res.sendFile(path.join(clientBuildPath, "index.html"));
// });
const fs = require("fs");

app.get("*", (req, res) => {
	const indexPath = path.join(clientBuildPath, "index.html");
	if (fs.existsSync(indexPath)) {
		res.sendFile(indexPath);
	} else {
		res.status(404).send("Frontend build not found.");
	}
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
