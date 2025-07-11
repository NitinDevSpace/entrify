import { axiosInstance } from ".";

export const addTheater = async (payload) => {
	try {
		const response = await axiosInstance.post(
			"/api/theaters/add-theater",
			payload
		);
		return response.data;
	} catch (error) {
		console.log("Error while adding theater", error.message);
	}
};

export const getAllTheaters = async () => {
	try {
		const response = await axiosInstance.get("/api/theaters/get-all-theaters");
		return response.data;
	} catch (error) {
		console.log("Error while getting all theaters", error.message);
	}
};
export const getOwnerTheaters = async (ownerId) => {
	try {
		const response = await axiosInstance.get(
			`/api/theaters/get-owner-theaters/${ownerId}`
		);
		return response.data;
	} catch (error) {
		console.log("Error while getting owner theaters", error.message);
	}
};
export const updateTheater = async (payload) => {
	try {
		const response = await axiosInstance.put(
			"/api/theaters/update-theater",
			payload
		);
		return response.data;
	} catch (error) {
		console.log("Error while updating theater", error.message);
	}
};
export const deleteTheater = async (payload) => {
	try {
		const response = await axiosInstance.delete(
			`/api/theaters/delete-theater/${payload}`
		);
		return response.data;
	} catch (error) {
		console.log("Error while deleting theater", error.message);
	}
};
