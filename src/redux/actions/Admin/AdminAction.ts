import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "../../../utils/customAxios";

export const addNewUser = createAsyncThunk<
  any,
  {
    name: String;
    email: String;
  },
  { rejectValue: APIError }
>("admin/addNewUser", async (body, { rejectWithValue }) => {
  try {
    const response = await CustomAxios.post(
      `/admin/adduser`,
      { email: body.email, name: body.name },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
});

export const editEmail = createAsyncThunk<
  any,
  {
    email: String;
    newEmail: String;
  },
  { rejectValue: APIError }
>("admin/editEmail", async (body, { rejectWithValue }) => {
  try {
    const response = await CustomAxios.post(
      `/admin/editemail`,
      { email: body.email, newEmail: body.newEmail },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
});

export const deleteOldRem = createAsyncThunk<
  any,
  String,
  { rejectValue: APIError }
>("admin/deleteOldRem", async (email, { rejectWithValue }) => {
  try {
    const response = await CustomAxios.post(
      `/admin/deleteoldrem`,
      { email: email },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
});

export const addOldRem = createAsyncThunk<
  any,
  {
    email: String;
    content: String;
    file: File | undefined;
  },
  { rejectValue: APIError }
>("admin/addOldRem", async (body, { rejectWithValue }) => {
  try {
    const response = await CustomAxios.post(
      `/admin/addoldrem`,
      { email: body.email, content: body.content, file: body.file },
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

export const addAdmin = createAsyncThunk<
  any,
  {
    name: String;
    email: String;
  },
  { rejectValue: APIError }
>("admin/addAdmin", async (body, { rejectWithValue }) => {
  try {
    const response = await CustomAxios.post(
      `/admin/addadmin`,
      { email: body.email, name: body.name },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
});

export const getAdminDetails = createAsyncThunk<
  any,
  void,
  { rejectValue: APIError }
>("admin/getAdminDetails", async (_, { rejectWithValue }) => {
  try {
    const response = await CustomAxios.get(`/admin/getadmin`, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
});

export const logoutAdmin = createAsyncThunk<
  any,
  void,
  { rejectValue: APIError }
>("admin/logoutAdmin", async (_, { rejectWithValue }) => {
  try {
    const response = await CustomAxios.get(`/admin/logout`, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
});
