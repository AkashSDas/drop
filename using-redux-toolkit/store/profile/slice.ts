import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDrop } from "store/drops/slice";

export interface IUser {
  id: string;
  email: string;
  username: string;
  profilePic: { id: string; URL: string } | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface IProfileState {
  loadingProfile: boolean;
  loadingDrops: boolean;
  loadingReDrops: boolean;
  loadingFollowers: boolean;
  loadingFollowings: boolean;
  user: IUser;
  drops: IDrop[];
  redrops: any[];
  followers: IUser[];
  followings: IUser[];
  self: boolean;
  following: boolean;
}

const initialState: IProfileState = {
  loadingProfile: false,
  loadingDrops: false,
  loadingReDrops: false,
  loadingFollowers: false,
  loadingFollowings: false,
  user: {
    id: null,
    email: null,
    username: null,
    profilePic: { id: null, URL: null },
    role: null,
    createdAt: null,
    updatedAt: null,
  },
  drops: null,
  redrops: null,
  followers: null,
  followings: null,
  following: false,
  self: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateLoadingProfile: (state, action: PayloadAction<boolean>) => {
      state.loadingProfile = action.payload;
    },
    updateLoadingDrops: (state, action: PayloadAction<boolean>) => {
      state.loadingDrops = action.payload;
    },
    updateLoadingReDrops: (state, action: PayloadAction<boolean>) => {
      state.loadingReDrops = action.payload;
    },
    updateLoadingFollowers: (state, action: PayloadAction<boolean>) => {
      state.loadingFollowers = action.payload;
    },
    updateLoadingFollowings: (state, action: PayloadAction<boolean>) => {
      state.loadingFollowings = action.payload;
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    updateProfileAndSelfRelation: (
      state,
      action: PayloadAction<{ following: boolean; self: boolean }>
    ) => {
      state.following = action.payload.following;
      state.self = action.payload.self;
    },
  },
});

export const {
  updateLoadingFollowers,
  updateLoadingFollowings,
  updateLoadingProfile,
  updateLoadingDrops,
  updateLoadingReDrops,
  updateUser,
  updateProfileAndSelfRelation,
} = profileSlice.actions;
export default profileSlice.reducer;
