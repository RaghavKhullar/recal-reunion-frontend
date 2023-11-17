import CustomAxios from "../../../utils/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRemsWrittenByMe = createAsyncThunk<
	any,
	void,
	{ rejectValue: APIError }
>("memory/getRemsWrittenByMe", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get(
			`/memory/getmywrittenrems`, {
			withCredentials: true
		}
		);
		return response;
	} catch (error: any) {
		return error.response;
	}
});

export const getRemsWrittenForMe = createAsyncThunk<
	any,
	void,
	{ rejectValue: APIError }
>("memory/getRemsWrittenForMe", async (_, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.get(
			`/memory/getmyrems`, {
			withCredentials: true
		}
		);
		return response;
	} catch (error: any) {
		return error.response;
	}
});

export const writeRem = createAsyncThunk<
	any,
	WriteRemBody,
	{ rejectValue: APIError }
>("memory/writeRem", async (body: WriteRemBody, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post(
			`/memory/updaterem`,
			{ file: body.file, content: body.content, to: body.to },
			{
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return response;
	} catch (error: any) {
		return error.response;
	}
});


