const movieRouter = require("express").Router();
const Movie = require("../models/movieModel");
const {
	addMovie,
	deleteMovie,
	getAllMovies,
	updateMovie,
} = require("../controllers/movieController");

//Add a Movie
movieRouter.post("/add-movie", addMovie);

//Delete a Movie
movieRouter.put("/delete-movie", deleteMovie);
//RESTFul API Method
//movieRouter.delete("/delete-movie/:id", deleteMovie);

//get All Movies
movieRouter.get("/get-all-movies", getAllMovies);

//update a Movie
movieRouter.put("/update-movie", updateMovie);

module.exports = movieRouter;
