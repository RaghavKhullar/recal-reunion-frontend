import axios from "axios";
import { BACKEND_URL } from "../../config"

export const getUser = async (user_id : string | undefined) => {
	try {
		const response = await axios.get(
			`${BACKEND_URL}/user/getUser?_id=${user_id}`,
			{ withCredentials: true }
		);
		return response;
	} catch (error: any) {
		return error.response;
	}

};