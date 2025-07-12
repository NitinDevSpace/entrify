const bookingRouter = require("express").Router();
const {
	makePayment,
	bookShow,
	getAllBookings,
} = require("../controllers/bookingController");


bookingRouter.post("/make-payment", makePayment);
bookingRouter.post("/bookShow", bookShow);
bookingRouter.get("/getAllBookings", getAllBookings);

module.exports = bookingRouter;
