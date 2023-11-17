import { createSlice } from "@reduxjs/toolkit";
import { getRemsWrittenByMe, getRemsWrittenForMe } from "../../actions/index";
import { initialState } from "../User/UserReducer";

export const memory = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getRemsWrittenByMe.rejected, (state) => {
            state.currentUser = { ...state.currentUser, writtenByUser: { isFetching: false, rems: [] } };
        });
        builder.addCase(getRemsWrittenByMe.pending, (state) => {
            state.currentUser = { ...state.currentUser, writtenByUser: { isFetching: true, rems: [] } };
        });
        builder.addCase(getRemsWrittenByMe.fulfilled, (state, { payload }) => {
            state.currentUser = { ...state.currentUser, writtenByUser: { isFetching: false, rems: payload.data.data } };
        });

        builder.addCase(getRemsWrittenForMe.rejected, (state) => {
            state.currentUser = { ...state.currentUser, writtenForUser: { isFetching: false, rems: [] } }
        });
        builder.addCase(getRemsWrittenForMe.pending, (state) => {
            state.currentUser = { ...state.currentUser, writtenForUser: { isFetching: true, rems: [] } }
        });
        builder.addCase(getRemsWrittenForMe.fulfilled, (state, { payload }) => {
            state.currentUser = { ...state.currentUser, writtenForUser: { isFetching: false, rems: payload.data.data } }
        });
    }
});

export default memory.reducer;