const express = require("express");
const app = express();

require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const stripeWebhookRoutes = require("./routes/stripeWebhook");

app.use(
	"/api/stripe",
	express.raw({ type: "application/json" }),
	stripeWebhookRoutes
);

app.use(express.json());

//Importing routes
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theaterRouter = require("./routes/theaterRoutes");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const auth = require("./middleware/authMiddleware");

// Routes/API calls
app.use("/api/users", userRouter);
app.use("/api/movies", auth, movieRouter);
app.use("/api/theaters", auth, theaterRouter);
app.use("/api/shows", auth, showRouter);
app.use("/api/bookings", auth, bookingRouter);

const Port = 8081;
app.listen(Port, () => {
	console.log(`Listening on port ${Port}`);
});
