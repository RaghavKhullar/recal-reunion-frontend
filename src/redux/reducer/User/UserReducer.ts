import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  getOtherUserFromId,
  searchUser,
  updateUserProfile,
  logoutUser
} from "../../actions";

export const initialState = {
  loggedIn: false,
  isFetching: false,
  isProfileUpdated: false,
  isFetchingSearch: false,
  isFetchingOtherUser: false,
  isOtherUserFetched: false,
  currentUser: {
    writtenByUser: { isFetching: false, rems: [] },
    writtenForUser: { isFetching: false, rems: [] },
  },
} as UserState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
      state.isProfileUpdated = true;
      state.currentUser = {
        ...state.currentUser,
        user: payload.data,
      };
    });

    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loggedIn = false;
      state.isFetching = false;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      if (payload.status === 200) {
        state.loggedIn = true;
        state.currentUser = {
          ...state.currentUser,
          user: payload.data.user,
          oldRem: payload.data.oldRem,
        };
      }
    });

    builder.addCase(getOtherUserFromId.rejected, (state) => {
      state.isOtherUserFetched = false;
      state.isFetching = false;
    });
    builder.addCase(getOtherUserFromId.pending, (state) => {
      state.isOtherUserFetched = false;
      state.isFetching = true;
    });
    builder.addCase(getOtherUserFromId.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isOtherUserFetched = true;
    });

    builder.addCase(searchUser.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(searchUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(searchUser.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(logoutUser.rejected, (state) => {
      state.loggedIn = false;
      state.isFetching = false;
      state.isProfileUpdated = false;
      state.isFetchingSearch = false;
      state.isFetchingOtherUser = false;
      state.isOtherUserFetched = false;
      state.currentUser = {
        writtenByUser: { isFetching: false, rems: [] },
        writtenForUser: { isFetching: false, rems: [] },
      }
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loggedIn = false;
      state.isFetching = false;
      state.isProfileUpdated = false;
      state.isFetchingSearch = false;
      state.isFetchingOtherUser = false;
      state.isOtherUserFetched = false;
      state.currentUser = {
        writtenByUser: { isFetching: false, rems: [] },
        writtenForUser: { isFetching: false, rems: [] },
      }
    });
  },
});

export const userSelector = (state: { user: UserState }) =>
  state.user !== undefined ? state.user : initialState;
export default user.reducer;
