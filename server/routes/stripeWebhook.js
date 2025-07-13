const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const EmailHelper = require("../utils/EmailHelper");

router.post(
	"/webhook",
	async (req, res) => {
		const sig = req.headers["stripe-signature"];
		let event;

		try {
			event = stripe.webhooks.constructEvent(
				req.body,
				sig,
				process.env.STRIPE_WEBHOOK_SECRET
			);
		} catch (err) {
			console.log("Webhook signature verification failed:", err.message);
			return res.status(400).send(`Webhook Error: ${err.message}`);
		}

		if (event.type === "checkout.session.completed") {
			const session = event.data.object;
			console.log("✅ Stripe checkout.session.completed received");

			const showId = session.metadata.showId;
			const userId = session.metadata.userId;
			const seats = JSON.parse(session.metadata.seats);

			// Create the booking
			const newBooking = new Booking({
				show: showId,
				transactionId: session.payment_intent,
				seats,
				user: userId,
			});
			await newBooking.save();

			// Update booked seats in Show
			const show = await Show.findById(showId);
			const updatedSeats = [...show.bookedSeats, ...seats];
			await Show.findByIdAndUpdate(showId, { bookedSeats: updatedSeats });

			console.log("✅ Booking created via webhook.");

			//Sending Ticket om mail
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
						model: "theaters",
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
					populateBookingInfo.seats.length *
					populateBookingInfo.show.ticketPrice,
				transactionId: populateBookingInfo.transactionId,
			});
			
		}

		res.json({ received: true });
	}
);

module.exports = router;
