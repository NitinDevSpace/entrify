const Theater = require("../models/theaterModel");

const addTheater = async (req, res) => {
	try {
		const newTheater = new Theater(req.body);
		await newTheater.save();
		res.send({
			success: true,
			message: "New theater has been added!",
		});
	} catch (error) {
		return res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};
const updateTheater = async (req, res) => {
	try {
		// const theater = await Theater.findById(req.body.theaterId);
		// if (!theater) {	return res.status(404).send({ success: false, message: "Theater not found" }); }
		// await Theater.findByIdAndUpdate(req.body.theaterId, req.body);
		const theater = await Theater.findByIdAndUpdate(
			req.body.theaterId,
			req.body,
			{ new: true }
		); // this will return the updated value if false then returns the old value
		if (!theater) {
			return res
				.status(404)
				.send({ success: false, message: "Theater not found" });
		}
		res.send({
			success: true,
			message: "Theater has been updated!",
		});
	} catch (error) {
		return res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};
const deleteTheater = async (req, res) => {
	try {
		await Theater.findByIdAndDelete(req.params.theaterId);
		res.send({
			success: true,
			message: "Theater deleted!",
		});
	} catch (error) {
		return res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};
//get all tehaters for the admin
const getAllTheaters = async (req, res) => {
	try {
		const allTheaters = await Theater.find().populate("owner"); //this gets teh details of the owner by the id and then populates all its details
		res.send({
			success: true,
			message: "All theaters fetched",
			data: allTheaters,
		});
	} catch (error) {
		return res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};
//All theaters of the owner
const getOwnerTheaters = async (req, res) => {
	try {
		const ownerTheaters = await Theater.find({ owner: req.params.ownerId });
		if (!ownerTheaters) {
			return res
				.status(404)
				.send({ success: false, message: "No theaters found!" });
		}
		res.send({
			success: true,
			message: "Theaters fetched",
			data: ownerTheaters,
		});
	} catch (error) {
		return res.status(500).send({ success: false, message: error.message });
	}
};

module.exports = {
	addTheater,
	updateTheater,
	deleteTheater,
	getAllTheaters,
	getOwnerTheaters,
};
