import { axiosInstance } from ".";

//Register New User

export const RegisterUser = async (values) => {
	try {
		const response = await axiosInstance.post("/api/users/register", values);
		return response.data;
	} catch (error) {
		console.log("Error while calling RegisterUser API ", error);
	}
};

//Login a User

export const LoginUser = async (values) => {
	try {
		const response = await axiosInstance.post("/api/users/login", values);
		return response.data;
	} catch (error) {
		console.log('"Error while calling Login API ",', error);
	}
};

// Get Current User

export const GetCurrentUser = async (values) => {
	try {
		const response = await axiosInstance.get(
			"/api/users/get-current-user",
			values
		);
		return response.data;
	} catch (error) {
		console.log("Error while calling getCurrentUser API ", error);
	}
};
