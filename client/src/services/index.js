import axios from "axios";

//use js-cookie dependency for simpler process
function getToken() {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; token=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}

export const axiosInstance = axios.create({
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

//------------ DONT Need This When using Cookies
//dynamically adding the token to the request
//interceptors intercept all requests before reacing the server and also all the responses before reching the frontend
axiosInstance.interceptors.request.use(
	function (config) {
		const token = getToken();
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

let rateLimitAlertShown = false;

axiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (
			error.response &&
			error.response.status === 429 &&
			error.response.data &&
			error.response.data.message
		) {
			if (!rateLimitAlertShown) {
				alert(error.response.data.message);
				rateLimitAlertShown = true;
				setTimeout(() => {
					rateLimitAlertShown = false;
				}, 10000); // Reset after 10sec
			}
		}
		return Promise.reject(error);
	}
);