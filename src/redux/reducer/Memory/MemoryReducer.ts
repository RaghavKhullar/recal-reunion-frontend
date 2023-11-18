import { createSlice } from "@reduxjs/toolkit";
import { getPublicRemsOfUser, getRemsWrittenByMe, getRemsWrittenForMe } from "../../actions/index";
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

        builder.addCase(getPublicRemsOfUser.rejected, (state) => {
            state.otherUser = { ...state.otherUser, writtenForUser: { isFetching: false, rems: [] }, writtenByUser: { isFetching: false, rems: [] } };
        });
        builder.addCase(getPublicRemsOfUser.pending, (state) => {
            state.otherUser = { ...state.otherUser, writtenForUser: { isFetching: true, rems: [] }, writtenByUser: { isFetching: true, rems: [] } };
        });
        builder.addCase(getPublicRemsOfUser.fulfilled, (state, { payload }) => {
            state.otherUser = { ...state.otherUser, writtenForUser: { isFetching: false, rems: payload.data.writtenForUser }, writtenByUser: { isFetching: false, rems: payload.data.writtenByUser } };
        });
    }
});

export default memory.reducer;