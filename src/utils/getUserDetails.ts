import axios from "axios";
export const getUserDetails = async () => {
	const response = await axios.get(
		`${
			import.meta.env.VITE_BACKEND_URL
		}/user/getDetails/?userEmail=123@gmail.com`,
		{ withCredentials: true }
	);
	return response.data;
};

export const getAllDetails = async () => {
	const response = await axios.get(
		`${import.meta.env.VITE_BACKEND_URL}/user/getAllDetails`,
		{ withCredentials: true }
	);
	return response.data;
};

export const searchUsers = async (name: string, department: string) => {
	const response = await axios.get(
		`${import.meta.env.VITE_BACKEND_URL}/user/searchUser/`,
		{ params: { name: name, department: department } }
	);
	return response.data;
};
