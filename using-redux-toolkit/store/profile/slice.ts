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

export type ProfileTab = "drop" | "redrop" | "following" | "follower";

interface IProfileState {
  loadingProfile: boolean;
  loadingDrops: boolean;
  loadingReDrops: boolean;
  loadingFollowers: boolean;
  loadingFollowings: boolean;
  loadingUserFollow: boolean;
  user: IUser;
  drops: IDrop[];
  redrops: any[];
  followers: IUser[];
  followings: IUser[];
  self: boolean;
  following: boolean;
  relationshipId: string;
  currentTab: ProfileTab;
  dropsTogglingReaction: boolean;
  dropsHasNext: boolean;
  dropsNext: string | null;
}

const initialState: IProfileState = {
  loadingProfile: false,
  loadingDrops: false,
  loadingReDrops: false,
  loadingFollowers: false,
  loadingFollowings: false,
  loadingUserFollow: false,
  user: {
    id: null,
    email: null,
    username: null,
    profilePic: { id: null, URL: null },
    role: null,
    createdAt: null,
    updatedAt: null,
  },
  drops: [],
  redrops: [],
  followers: [],
  followings: [],
  following: false,
  self: false,
  relationshipId: null,
  currentTab: "drop",
  dropsHasNext: false,
  dropsNext: null,
  dropsTogglingReaction: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateTab: (state, action: PayloadAction<ProfileTab>) => {
      state.currentTab = action.payload;
    },
    updateLoadingUserFollow: (state, action: PayloadAction<boolean>) => {
      state.loadingUserFollow = action.payload;
    },
    updateFollowingStatus: (
      state,
      action: PayloadAction<{ following: boolean; relationshipId: string }>
    ) => {
      state.following = action.payload.following;
      state.relationshipId = action.payload.relationshipId;
    },
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
      action: PayloadAction<{
        following: boolean;
        self: boolean;
        relationshipId: string;
      }>
    ) => {
      state.following = action.payload.following;
      state.self = action.payload.self;
      state.relationshipId = action.payload.relationshipId;
    },
    updateMoreDropsInfo: (
      state,
      action: PayloadAction<{ next: string | null; hasNext: boolean }>
    ) => {
      state.dropsHasNext = action.payload.hasNext;
      state.dropsNext = action.payload.next;
    },
    initDropsAdd: (state, action: PayloadAction<IDrop[]>) => {
      state.drops = action.payload;
    },
    updateReactionLoading: (state, action: PayloadAction<boolean>) => {
      state.dropsTogglingReaction = action.payload;
    },
    addDrop: (state, action: PayloadAction<IDrop>) => {
      state.drops = [action.payload, ...state.drops];
    },
    pushDrops: (state, action: PayloadAction<IDrop[]>) => {
      state.drops = [...state.drops, ...action.payload];
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
  updateLoadingUserFollow,
  updateFollowingStatus,
  updateTab,
  addDrop,
  initDropsAdd,
  pushDrops,
  updateMoreDropsInfo,
  updateReactionLoading,
} = profileSlice.actions;
export default profileSlice.reducer;
