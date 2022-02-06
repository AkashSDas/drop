import { IDrop } from "store/drops/slice";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  email: string;
  username: string;
  profilePic: { id: string; URL: string } | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFollower {
  id: string;
  follower: IUser;
  followed: IUser;
  createdAt: string;
  updatedAt: string;
  isFollowing: boolean;
  relationshipId: string | null;
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
  followers: IFollower[];
  followings: IFollower[];
  self: boolean;
  following: boolean;
  relationshipId: string;
  currentTab: ProfileTab;
  dropsTogglingReaction: boolean;
  dropsHasNext: boolean;
  dropsNext: string | null;
  togglingFollowStatus: boolean;
  followersHasNext: boolean;
  followersNext: string | null;
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
  followersHasNext: false,
  followersNext: null,
  togglingFollowStatus: false,
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
    updateTogglingFollowStatus: (state, action: PayloadAction<boolean>) => {
      state.togglingFollowStatus = action.payload;
    },
    updateMoreFollowersInfo: (
      state,
      action: PayloadAction<{ next: string | null; hasNext: boolean }>
    ) => {
      state.followersHasNext = action.payload.hasNext;
      state.followersNext = action.payload.next;
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
    initFollowersAdd: (state, action: PayloadAction<IFollower[]>) => {
      state.followers = action.payload;
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
    toggleDropReacted: (
      state,
      action: PayloadAction<{
        reaction: {
          reaction: string;
          id: string;
          oldReaction: string;
          countUpdated: boolean;
        };
        dropId: string;
      }>
    ) => {
      const { reaction, dropId } = action.payload;

      let drops = [];
      for (let i = 0; i < state.drops.length; i++) {
        const drop = state.drops[i];
        if (drop.id === dropId) {
          // decrement count of old reaction & increment count of new reaction

          let reactionsOnDrop = [];
          if (!reaction.countUpdated) {
            for (let j = 0; j < drop.reactionsOnDrop.length; j++) {
              const reactionInfo = drop.reactionsOnDrop[j];
              if (reactionInfo.name === reaction.oldReaction) {
                reactionsOnDrop.push({
                  ...reactionInfo,
                  count: reactionInfo.count - 1,
                });
              } else if (reactionInfo.name === reaction.reaction) {
                reactionsOnDrop.push({
                  ...reactionInfo,
                  count: reactionInfo.count + 1,
                });
              } else {
                reactionsOnDrop.push(reactionInfo);
              }
            }
          }

          drops.push({
            ...drop,
            reacted: { id: reaction.id, reaction: reaction.reaction },
            reactionsOnDrop: !reaction.countUpdated
              ? reactionsOnDrop
              : drop.reactionsOnDrop,
          });
        } else {
          drops.push(drop);
        }
      }

      state.drops = drops;
    },
    addDropReaction: (
      state,
      action: PayloadAction<{
        reaction: {
          reaction: string;
          id: string;
          countUpdated: boolean;
        };
        dropId: string;
      }>
    ) => {
      const { reaction, dropId } = action.payload;

      let drops = [];
      for (let i = 0; i < state.drops.length; i++) {
        const drop = state.drops[i];
        if (drop.id === dropId) {
          // decrement count of old reaction & increment count of new reaction

          let reactionsOnDrop = [];
          if (!reaction.countUpdated) {
            for (let j = 0; j < drop.reactionsOnDrop.length; j++) {
              const reactionInfo = drop.reactionsOnDrop[j];
              if (reactionInfo.name === reaction.reaction) {
                reactionsOnDrop.push({
                  ...reactionInfo,
                  count: reactionInfo.count + 1,
                });
              } else {
                reactionsOnDrop.push(reactionInfo);
              }
            }
          }

          drops.push({
            ...drop,
            reacted: { id: reaction.id, reaction: reaction.reaction },
            reactionsOnDrop: !reaction.countUpdated
              ? reactionsOnDrop
              : drop.reactionsOnDrop,
          });
        } else {
          drops.push(drop);
        }
      }

      state.drops = drops;
    },
    unReactDropReaction: (
      state,
      action: PayloadAction<{
        reaction: {
          reaction: string;
          countUpdated: boolean;
        };
        dropId: string;
      }>
    ) => {
      const { reaction, dropId } = action.payload;

      let drops = [];
      for (let i = 0; i < state.drops.length; i++) {
        const drop = state.drops[i];
        if (drop.id === dropId) {
          // decrement count of old reaction & increment count of new reaction

          let reactionsOnDrop = [];
          if (!reaction.countUpdated) {
            for (let j = 0; j < drop.reactionsOnDrop.length; j++) {
              const reactionInfo = drop.reactionsOnDrop[j];
              if (reactionInfo.name === reaction.reaction) {
                reactionsOnDrop.push({
                  ...reactionInfo,
                  count: reactionInfo.count - 1,
                });
              } else {
                reactionsOnDrop.push(reactionInfo);
              }
            }
          }
          drops.push({
            ...drop,
            reacted: null,
            reactionsOnDrop: !reaction.countUpdated
              ? reactionsOnDrop
              : drop.reactionsOnDrop,
          });
        } else {
          drops.push(drop);
        }
      }

      state.drops = drops;
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
  addDropReaction,
  toggleDropReacted,
  unReactDropReaction,
  updateMoreFollowersInfo,
  updateTogglingFollowStatus,
  initFollowersAdd,
} = profileSlice.actions;
export default profileSlice.reducer;
