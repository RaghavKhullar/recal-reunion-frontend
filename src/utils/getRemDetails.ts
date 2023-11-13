import axios from "axios";
export const getWrittenRemsForMe = async () => {
	const response = await axios.get(
		`${import.meta.env.VITE_BACKEND_URL}/memory/getmyrems`,
		{ withCredentials: true }
	);
	return response.data;
};

export const getWrittenRemsByMe = async () => {
	const response = await axios.get(
		`${import.meta.env.VITE_BACKEND_URL}/memory/getmywrittenrems`,
		{ withCredentials: true }
	);
	return response.data;
};

export const fetchUser = async (_id: string) => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_BACKEND_URL}/user/getUser`,
			{ withCredentials: true, params: { _id: _id } }
		);

		const userData = response.data.data;
		const userImage = response.data.image;

		return { userData, userImage };
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
};
