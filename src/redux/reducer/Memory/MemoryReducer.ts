import { createSlice } from "@reduxjs/toolkit";
import {
  getPublicRemsOfUser,
  getRemsWrittenByMe,
  getRemsWrittenForMe,
  getRemOfPair,
  changePrivacy,
  getRemFromId,
} from "../../actions/index";
import { initialState } from "../User/UserReducer";

export const memory = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getRemsWrittenByMe.rejected, (state) => {
      state.currentUser = {
        ...state.currentUser,
        writtenByUser: { isFetching: false, rems: [] },
      };
    });
    builder.addCase(getRemsWrittenByMe.pending, (state) => {
      state.currentUser = {
        ...state.currentUser,
        writtenByUser: { isFetching: true, rems: [] },
      };
    });
    builder.addCase(getRemsWrittenByMe.fulfilled, (state, { payload }) => {
      if (payload.status === 200)
        state.currentUser = {
          ...state.currentUser,
          writtenByUser: { isFetching: false, rems: payload.data.data },
        };
    });

    builder.addCase(getRemsWrittenForMe.rejected, (state) => {
      state.currentUser = {
        ...state.currentUser,
        writtenForUser: { isFetching: false, rems: [] },
      };
    });
    builder.addCase(getRemsWrittenForMe.pending, (state) => {
      state.currentUser = {
        ...state.currentUser,
        writtenForUser: { isFetching: true, rems: [] },
      };
    });
    builder.addCase(getRemsWrittenForMe.fulfilled, (state, { payload }) => {
      if (payload.status === 200)
        state.currentUser = {
          ...state.currentUser,
          writtenForUser: { isFetching: false, rems: payload.data.data },
        };
    });

    builder.addCase(getPublicRemsOfUser.rejected, (state) => {
    });
    builder.addCase(getPublicRemsOfUser.pending, (state) => {
    });
    builder.addCase(getPublicRemsOfUser.fulfilled, (state, { payload }) => {
    });

    builder.addCase(getRemOfPair.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(getRemOfPair.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getRemOfPair.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(changePrivacy.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(changePrivacy.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(changePrivacy.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      if (payload.status === 200) {
        state.currentUser.writtenForUser.rems.forEach((rem: Rem) => {
          if (rem.id === payload.data.data._id) {
            rem.isPrivate = payload.data.data.isPrivate;
          }
        });
      }
    });

    builder.addCase(getRemFromId.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(getRemFromId.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getRemFromId.fulfilled, (state, { payload }) => {
      state.isFetching = false;
    });
  },
});

export default memory.reducer;
