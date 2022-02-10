import { IAuthor } from "store/drops/types";

import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchInitialProfileFollowers, fetchMoreProfileFollowers, followUserInProfileFollowers, unFollowUserInProfileFollowers } from "./thunk";

export interface IFollower {
  id: string;
  follower: IAuthor;
  followed: IAuthor;
  amIFollowing: boolean;
  relationshipId: string | null;
  createdAt: string;
  updatedAt: string;
  isUpdatingFollowerStatus: boolean;
}

export const profileFollowersAdapter = createEntityAdapter<IFollower>();
const initialState = profileFollowersAdapter.getInitialState({
  isLoading: false,
  next: null,
  hasNext: null,
});

export const profileFollowersSlice = createSlice({
  name: "profileFollowers",
  initialState,
  reducers: {
    changeIsUpdatingStatus: (
      state,
      action: PayloadAction<{ id: string; status: boolean }>
    ) => {
      // TODO: Not updating the state
      const { id, status } = action.payload;
      state.entities[id].isUpdatingFollowerStatus = status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialProfileFollowers.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInitialProfileFollowers.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        const { entities, hasNext, ids, next } = action.payload;
        state.entities = entities;
        state.ids = ids;
        state.next = next;
        state.hasNext = hasNext;
      }
    });
    builder.addCase(fetchInitialProfileFollowers.rejected, (state, _) => {
      state.isLoading = false;
    });
    builder.addCase(fetchMoreProfileFollowers.fulfilled, (state, action) => {
      if (action.payload) {
        const { entities, ids, next, hasNext } = action.payload;
        state.entities = { ...state.entities, ...entities };
        state.ids = [...state.ids, ...ids];
        state.next = next;
        state.hasNext = hasNext;
      }
    });
    builder.addCase(followUserInProfileFollowers.fulfilled, (state, action) => {
      if (action.payload) {
        const {
          following,
          loggedInUserAndFollowerRelationshipId,
          relationshipId,
        } = action.payload;
        state.entities[relationshipId].amIFollowing = following;
        state.entities[relationshipId].relationshipId =
          loggedInUserAndFollowerRelationshipId;
      }
    });
    builder.addCase(
      unFollowUserInProfileFollowers.fulfilled,
      (state, action) => {
        if (action.payload) {
          const {
            following,
            loggedInUserAndFollowerRelationshipId,
            relationshipId,
          } = action.payload;
          state.entities[relationshipId].amIFollowing = following;
          state.entities[relationshipId].relationshipId =
            loggedInUserAndFollowerRelationshipId;
        }
      }
    );
  },
});

export const { changeIsUpdatingStatus } = profileFollowersSlice.actions;

export const { selectById: selectProfileFollowerById } =
  profileFollowersAdapter.getSelectors();

export default profileFollowersSlice.reducer;
