import { IAuthor } from "store/drops/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchProfileUser, followProfileUser, unFollowProfileUser } from "./thunk";

export type ProfileTab = "drop" | "redrop" | "following" | "follower";

interface IProfileState {
  isLoading: boolean;
  user: IAuthor;
  relationshipId: string | null;
  isUpdatingFollowStatus: boolean;
  self: boolean; // loggedIn user === profile user
  amIFollowing: boolean;
  currentTab: ProfileTab;
}

const initialState: IProfileState = {
  isLoading: false,
  relationshipId: null,
  isUpdatingFollowStatus: false,
  self: false,
  amIFollowing: false,
  currentTab: "drop",
  user: {
    id: null,
    email: null,
    username: null,
    profilePic: { id: null, URL: null },
    role: null,
    createdAt: null,
    updatedAt: null,
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<ProfileTab>) => {
      state.currentTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileUser.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfileUser.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.user = action.payload.user;
        const followingInfo = action.payload.relationshipInfo;
        state.amIFollowing = followingInfo.amIFollowing;
        state.self = followingInfo.self;
        state.relationshipId = followingInfo.relationshipId;
      }
    });
    builder.addCase(fetchProfileUser.rejected, (state, _) => {
      state.isLoading = false;
    });
    builder.addCase(followProfileUser.pending, (state, _) => {
      state.isUpdatingFollowStatus = true;
    });
    builder.addCase(followProfileUser.fulfilled, (state, action) => {
      state.isUpdatingFollowStatus = false;
      if (action.payload) {
        state.relationshipId = action.payload.relationshipId;
        state.amIFollowing = action.payload.following;
      }
    });
    builder.addCase(followProfileUser.rejected, (state, _) => {
      state.isUpdatingFollowStatus = false;
    });
    builder.addCase(unFollowProfileUser.pending, (state, _) => {
      state.isUpdatingFollowStatus = true;
    });
    builder.addCase(unFollowProfileUser.fulfilled, (state, action) => {
      state.isUpdatingFollowStatus = false;
      if (action.payload) {
        state.relationshipId = action.payload.relationshipId;
        state.amIFollowing = action.payload.following;
      }
    });
    builder.addCase(unFollowProfileUser.rejected, (state, _) => {
      state.isUpdatingFollowStatus = false;
    });
  },
});

export const { changeTab } = profileSlice.actions;

export default profileSlice.reducer;
