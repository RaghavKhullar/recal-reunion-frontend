import axios from "axios";
import { BACKEND_URL } from "../../config"
import { showNotification } from "../utils/helpers";

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


export const postRem =async (file: any, content : string, remRecipientID : string | undefined) => {
	try {
		const response = await axios.post(
			`${BACKEND_URL}/memory/updaterem`,
			{file : file, content : content, to : remRecipientID },
			{
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		showNotification("Success", "Rem written successfully", "success")
		return response;
	} catch (error: any) {
		return error.response;
	}
}