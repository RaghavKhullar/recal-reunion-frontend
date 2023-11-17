import { createSlice } from "@reduxjs/toolkit";
import { getRemsWrittenByMe, getRemsWrittenForMe } from "../../actions/index";
import { initialState } from "../User/UserReducer";

export const memory = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getRemsWrittenByMe.rejected, (state) => {
            state.currentUser.writtenByUser.isFetching = false;
            state.currentUser.writtenByUser.rems = [];
        });
        builder.addCase(getRemsWrittenByMe.pending, (state) => {
            state.currentUser.writtenByUser.isFetching = true;
            state.currentUser.writtenByUser.rems = [];
        });
        builder.addCase(getRemsWrittenByMe.fulfilled, (state, { payload }) => {
            state.currentUser.writtenByUser.isFetching = false;
            state.currentUser.writtenByUser.rems = payload.data.data;
        });

        builder.addCase(getRemsWrittenForMe.rejected, (state) => {
            state.currentUser.writtenForUser.isFetching = false;
            state.currentUser.writtenForUser.rems = [];
        });
        builder.addCase(getRemsWrittenForMe.pending, (state) => {
            state.currentUser.writtenForUser.isFetching = true;
            state.currentUser.writtenForUser.rems = [];
        });
        builder.addCase(getRemsWrittenForMe.fulfilled, (state, { payload }) => {
            state.currentUser.writtenForUser.isFetching = false;
            state.currentUser.writtenForUser.rems = payload.data.data;
        });
    }
});

export default memory.reducer;