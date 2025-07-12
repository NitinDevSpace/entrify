const stripe = require("stripe")(process.env.STRIPE_KEY);
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
//const EmailHelper = require("../utils/EmailHelper");

const makePayment = async (req, res) => {
	try {
		const { amount, userEmail } = req.body;

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "inr",
						product_data: {
							name: "Movie Ticket Booking",
						},
						unit_amount: parseInt(amount * 100), // INR paise
					},
					quantity: 1,
				},
			],
			mode: "payment",
			customer_email: userEmail,
			metadata: {
				showId: req.body.showId,
				userId: req.body.userId,
				seats: JSON.stringify(req.body.seats),
			},
			success_url: `${process.env.CLIENT_URL}/profile`,
			cancel_url: `${process.env.CLIENT_URL}/book-show`,
		});

		res.send({
			success: true,
			sessionId: session.id,
		});
	} catch (error) {
		res.send({
			success: false,
			message: error.message,
		});
	}
};

const bookShow = async (req, res) => {
	try {
		const newBooking = new Booking(req.body);
		await newBooking.save();
		const show = await Show.findById(req.body.show);
		const updateBookedSeats = [...show.bookedSeats, ...req.body.seats];
		await Show.findByIdAndUpdate(req.body.show, {
			bookedSeats: updateBookedSeats,
		});

		const populateBookingInfo = await Booking.findById(newBooking._id)
			.populate("user")
			.populate("show")
			.populate({
				path: "show",
				populate: {
					path: "movie",
					model: "movies",
				},
			})
			.populate({
				path: "show",
				populate: {
					path: "theatre",
					model: "theatres",
				},
			});

		await EmailHelper("ticketTemplate.html", populateBookingInfo.user.email, {
			name: populateBookingInfo.user.name,
			movie: populateBookingInfo.show.movie.title,
			theatre: populateBookingInfo.show.theatre.name,
			date: populateBookingInfo.show.date,
			time: populateBookingInfo.show.time,
			seats: populateBookingInfo.seats,
			amount:
				populateBookingInfo.seats.length * populateBookingInfo.show.ticketPrice,
			transactionId: populateBookingInfo.transactionId,
		});
		res.send({
			success: true,
			message: "New Bookings are Done",
			data: newBooking,
		});
	} catch (error) {
		res.send({
			success: false,
			message: error.message,
		});
	}
};

const getAllBookings = async (req, res) => {
	try {
		const bookings = await Booking.find({ user: req.body.userId })
			.populate("user")
			.populate("show")
			.populate({
				path: "show",
				populate: {
					path: "movie",
					model: "movies",
				},
			})
			.populate({
				path: "show",
				populate: {
					path: "theatre",
					model: "theatres",
				},
			});

		res.send({
			success: true,
			message: "Bookings fetched!",
			data: bookings,
		});
	} catch (err) {
		res.send({
			success: false,
			message: err.message,
		});
	}
};

module.exports = {
	bookShow,
	makePayment,
	getAllBookings,
};
