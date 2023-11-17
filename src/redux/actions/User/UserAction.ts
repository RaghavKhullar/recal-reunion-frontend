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
export const getOtherUserFromId = createAsyncThunk<
	any,
	String,
	{ rejectValue: APIError }
>("user/getOtherUserFromId", async (_id: String, { rejectWithValue }) => {
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

// This route is similar to above route, but this will be used on all other pages except profile page of the user
export const getOtherUserDetailsFromId = createAsyncThunk<
	any,
	String,
	{ rejectValue: APIError }
>("user/getOtherUserDetailsFromId", async (_id: String, { rejectWithValue }) => {
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

export const searchUser = createAsyncThunk<
	any,
	String,
	{ rejectValue: APIError }
>("user/search", async (name: String, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get(
			`/user/searchUser`, {
			withCredentials: true, params: { name: name }
		}
		);
		return response;
	} catch (error: any) {
		return error.response;
	}
});
