import CustomAxios from "../../../utils/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRemsWrittenByMe = createAsyncThunk<
  any,
  void,
  { rejectValue: APIError }
>("memory/getRemsWrittenByMe", async (_, { rejectWithValue }) => {
  try {
    const response = await CustomAxios.get(`/memory/getmywrittenrems`, {
      withCredentials: true,
    });
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
    const response = await CustomAxios.get(`/memory/getmyrems`, {
      withCredentials: true,
    });
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
			{ file: body.isFileUpdated === true ? body.file : undefined, content: body.content, to: body.to, isFileUpdated: body.isFileUpdated },
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

export const getPublicRemsOfUser = createAsyncThunk<
  any,
  String,
  { rejectValue: APIError }
>("memory/getPublicRemsOfUser", async (id: String, { rejectWithValue }) => {
  try {
    const response = await CustomAxios.post(
      `/memory/getuserrems`,
      { id: id },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
});

// Don't update store for it
export const getRemOfPair = createAsyncThunk<
	any,
	String,
	{ rejectValue: APIError }
>("memory/getRemOfPair", async (id: String, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post(
			`/memory/getremofpair`,
			{ id: id },
			{
				withCredentials: true,
			}
		);
		return response;
	} catch (error: any) {
		return error.response;
	}
});

export const changePrivacy = createAsyncThunk<
	any,
	{
		id: String,
		privacy: Boolean
	},
	{ rejectValue: APIError }
>("memory/changeRemPrivacy", async (body, { rejectWithValue }) => {
	try {
		const response = await CustomAxios.post(
			`/memory/changeprivacy`,
			{ remId: body.id, privacy: !(body.privacy) },
			{
				withCredentials: true,
			}
		);
		return response;
	} catch (error: any) {
		return error.response;
	}
});
