import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    isFetching: true,
    isProfileUpdated: false
}

export const admin = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    }
});

export const adminSelector = (state: { admin: any }) => state.admin !== undefined ? state.admin : initialState;
export default admin.reducer;