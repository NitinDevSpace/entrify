import { axiosInstance } from ".";

//get All Movies
export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get('/api/movies/get-all-movies');
        return response.data;
    } catch (error) {
        console.log("Error while calling getAllMovies API ", error);
    }
}

//Add a movie
export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post('/api/movies/add-movie', values);
        return response.data;
    } catch (error) {
        console.log("Error while calling addMovie API ",error);
    }
}

//Update a Movie
export const updateMovie = async (payload) => {
    try {
        const response = await axiosInstance.put('/api/movies/update-movie', payload);
        return response.data;
	} catch (error) {
		console.log("Error while calling updateMovie API ", error);
	}
};

//Delete a Movie
export const deleteMovie = async(payload) => {
    try {
        const response = await axiosInstance.put('/api/movies/delete-movie', payload);
        return response.data;
	} catch (error) {
		console.log("Error while calling deleteMovie API ", error);
	}
};