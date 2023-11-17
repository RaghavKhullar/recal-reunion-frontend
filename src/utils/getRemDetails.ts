import axios from "axios";
import { BACKEND_URL } from "../../config"
import { showNotification } from "../helpers/helpers";


export const postRem = async (file: any, content: string, remRecipientID: string | undefined) => {
	try {
		const response = await axios.post(
			`${BACKEND_URL}/memory/updaterem`,
			{ file: file, content: content, to: remRecipientID },
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