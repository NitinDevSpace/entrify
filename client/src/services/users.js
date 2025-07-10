import { axiosInstance } from ".";

//Register New User

export const RegisterUser = async (values) => {
    try {
        const response = await axiosInstance.post("/api/users/register", values);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Login a User

export const LoginUser = async (values) => {
    try {
        const response = await axiosInstance.post("/api/users/login", values);
        return response.data;
        
    } catch (error) {
        console.log(error);
    }
}