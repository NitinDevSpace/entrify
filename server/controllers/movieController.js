const Movie = require("../models/movieModel");

const addMovie = async (req, res) => {
	try {
		const newMovie = new Movie(req.body);
		await newMovie.save();
		res.send({
			success: true,
			message: "New movie added!",
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};

const deleteMovie = async (req, res) => {
    try {
        //const movie = await Movie.findByIdAndDe
		const movie = await Movie.findByIdAndDelete(req.body.movieId);
		res.send({
			success: true,
			message: "Movie Deleted!",
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};

const getAllMovies = async (req, res) => {
	try {
		const allMovies = await Movie.find().limited(req.body.limit || 35);
		res.send({
			success: true,
			message: "All movies fetched",
			data: allMovies,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};

const updateMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message:'Movie updated',
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message:error.message,
        })
    }
};

const getMovieById = async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		res.send({
			success: true,
			message: "Movie fetched successfully!",
			data: movie,
		});
	} catch (err) {
		res.send({
			success: false,
			message: err.message,
		});
	}
};

module.exports = { addMovie, deleteMovie, getAllMovies, updateMovie, getMovieById };
