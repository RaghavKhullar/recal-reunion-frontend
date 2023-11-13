import axios from "axios";
import { BACKEND_URL } from "../../config"
export const getWrittenRemsForMe = async () => {
	try {
		const response = await axios.get(
			`${BACKEND_URL}/memory/getmyrems`,
			{ withCredentials: true }
		);
		return response;
	} catch (error: any) {
		return error.response;
	}

};

export const getWrittenRemsByMe = async () => {
	try {
		const response = await axios.get(
			`${BACKEND_URL}/memory/getmywrittenrems`,
			{ withCredentials: true }
		);
		return response;
	}
	catch (error: any) {
		return error.response;
	}
};

export const fetchUser = async (_id: string) => {
	try {
		const response = await axios.get(
			`${BACKEND_URL}/user/getUser`,
			{ withCredentials: true, params: { _id: _id } }
		);

		const userData = response.data.data;
		const userImage = response.data.image;

		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const getUserDetails = async () => {
	try {
		const response = await axios.get(
			`${BACKEND_URL}/user/getDetails`, {
			withCredentials: true
		}
		);
		return response;
	} catch (error: any) {
		return error.response;
	}
}
