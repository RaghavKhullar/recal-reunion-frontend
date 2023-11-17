import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, getOtherUserFromId, searchUser, getOtherUserDetailsFromId } from "../../actions";

export const initialState = {
    loggedIn: false,
    isFetching: true,
    isProfileUpdated: false,
    isFetchingSearch: false,
    isFetchingOtherUser: false,
    isOtherUserFetched: false,
    currentUser: {
        writtenByUser: { isFetching: false, rems: [] },
        writtenForUser: { isFetching: false, rems: [] }
    },
    otherUser: {
        writtenByUser: { isFetching: false, rems: [] },
        writtenForUser: { isFetching: false, rems: [] }
    },
} as UserState;

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loggedIn = false;
            state.isFetching = false;
        });
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loggedIn = false;
            state.isFetching = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
            state.loggedIn = true;
            state.isFetching = false;
            state.currentUser = { ...state.currentUser, user: payload.data.user, oldRem: payload.data.oldRem };
        });

        builder.addCase(getOtherUserFromId.rejected, (state) => {
            state.isOtherUserFetched = false;
            state.isFetchingOtherUser = false;
        });
        builder.addCase(getOtherUserFromId.pending, (state) => {
            state.isOtherUserFetched = false;
            state.isFetchingOtherUser = true;
        });
        builder.addCase(getOtherUserFromId.fulfilled, (state, { payload }) => {
            state.isFetchingOtherUser = false;
            state.isOtherUserFetched = true;
            state.otherUser = { ...state.otherUser, user: payload.data.user, oldRem: payload.data.oldRem };
        });

        builder.addCase(getOtherUserDetailsFromId.rejected, (state) => {
            state.isOtherUserFetched = false;
            state.isFetchingOtherUser = false;
        });
        builder.addCase(getOtherUserDetailsFromId.pending, (state) => {
            state.isOtherUserFetched = false;
            state.isFetchingOtherUser = true;
        });
        builder.addCase(getOtherUserDetailsFromId.fulfilled, (state) => {
            state.isFetchingOtherUser = false;
            state.isOtherUserFetched = true;
        });

        builder.addCase(searchUser.rejected, (state) => {
            state.isFetchingSearch = false;
        });
        builder.addCase(searchUser.pending, (state) => {
            state.isFetchingSearch = true;
        });
        builder.addCase(searchUser.fulfilled, (state) => {
            state.isFetchingSearch = false;
        });
    }
})

export const userSelector = (state: { user: UserState }) => state.user !== undefined ? state.user : initialState;
export default user.reducer;
