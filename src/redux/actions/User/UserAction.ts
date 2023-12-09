import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "../../../utils/customAxios";

export const getCurrentUser = createAsyncThunk<
  any,
  void,
  { rejectValue: APIError }
>("user/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await CustomAxios.get(`/user/getDetails`, {
      withCredentials: true,
    });
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
    const response = await CustomAxios.get(`/user/getUser`, {
      withCredentials: true,
      params: { _id: _id },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
});

export const searchUser = createAsyncThunk<
  any,
  string,
  { rejectValue: APIError }
>("user/search", async (name: string, { rejectWithValue }) => {
  try {
    const response = await CustomAxios.get(`/user/searchUser`, {
      withCredentials: true,
      params: { name: name },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
});

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (form: FormData, { rejectWithValue }) => {
    try {
      const response = await CustomAxios.post(`/user/updateProfile`, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
);
