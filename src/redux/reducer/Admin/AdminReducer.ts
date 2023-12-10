import { createSlice } from "@reduxjs/toolkit";
import { getAdminDetails, logoutAdmin } from "../../actions";

const initialState = {
  loggedIn: false,
  isFetching: false,
  name: "",
  isProfileUpdated: false
} as AdminState;

export const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getAdminDetails.rejected, (state) => {
      state.isFetching = false;
      state.loggedIn = false;
    });
    builder.addCase(getAdminDetails.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getAdminDetails.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      if (payload.status === 200) { state.loggedIn = true; state.name = payload.data.data.name; }
      else { state.loggedIn = false; state.name = ""; }
    });

    builder.addCase(logoutAdmin.rejected, (state) => {
      state.isFetching = false;
      state.loggedIn = false;
      state.name = "";
    });
    builder.addCase(logoutAdmin.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(logoutAdmin.fulfilled, (state) => {
      state.isFetching = false;
      state.loggedIn = false;
      state.name = "";
    });
  },
});

export const adminSelector = (state: { admin: AdminState }) =>
  state.admin !== undefined ? state.admin : initialState;
export default admin.reducer;
