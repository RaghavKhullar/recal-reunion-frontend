import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "../../../utils/customAxios";

export const getCurrentUser = createAsyncThunk<
	any,
	void,
	{ rejectValue: APIError }
>("user/getCurrentUser", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get(
			`/user/getDetails`, {
			withCredentials: true
		}
		);
		return response;
	} catch (error: any) {
		return error.response;
	}
});

// Use this when viewing other user's profile page
export const getUserFromId = createAsyncThunk<
	any,
	String,
	{ rejectValue: APIError }
>("user/getUserFromId", async (_id: String, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get(
			`/user/getUser`, {
			withCredentials: true, params: { _id: _id }
		}
		);
		return response;
	} catch (error: any) {
		return error.response;
	}
});
