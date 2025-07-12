import { axiosInstance } from ".";

export const createCheckoutSession = (payload) => {
	return axiosInstance.post("/api/bookings/make-payment", payload);
};


export const bookShow = async (payload) => {
	try {
		const response = await axiosInstance.post(
			"/api/bookings/bookShow",
			payload
		);
		console.log(response.data);
		return response.data;
	} catch (err) {
		return err.response;
	}
};

export const getAllBookings = async () => {
	try {
		const response = await axiosInstance.get("/api/bookings/getAllBookings");
		return response.data;
	} catch (err) {
		return err.response;
	}
};
