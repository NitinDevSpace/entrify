const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		movie: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "movies",
			required: true,
		},
		totalSeats: {
			type: Number,
			required: true,
		},
		ticketPrice: {
			type: Number,
			required: true,
		},
		bookedSeats: {
			type: Array,
			default: [],
		},
		theatre: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "theaters",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Show = mongoose.model('shows', showSchema);

module.exports = Show;
