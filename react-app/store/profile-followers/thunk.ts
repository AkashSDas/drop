import { normalizeProfileFollowers } from "lib/normalize/profile";
import toast from "react-hot-toast";
import fetchUserFollowersPaginatedService from "services/profile/fetch-user-followers";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInitialProfileFollowers = createAsyncThunk(
  "profileFollowers/fetchInitialProfileFollowers",
  async (payload: { userId: string; limit: number }, { getState }) => {
    const loggedInUserId = (getState() as any).user.info?.id;
    const response = await fetchUserFollowersPaginatedService({
      userId: payload.userId,
      limit: payload.limit,
      selfUserId: loggedInUserId,
    });
    if (response.isError) {
      toast.error(response.msg);
      return;
    }
    const entities = normalizeProfileFollowers(response.data.followers);
    const ids = Object.keys(entities);
    return {
      entities,
      ids,
      next: response.data.next,
      hasNext: response.data.hasNext,
    };
  }
);

export const fetchMoreProfileFollowers = createAsyncThunk(
  "profileFollowers/fetchMoreProfileFollowers",
  async (payload: { userId: string; limit: number }, { getState }) => {
    const next = (getState() as any).profileFollowers.next;
    const loggedInUserId = (getState() as any).user.info?.id;
    const response = await fetchUserFollowersPaginatedService({
      userId: payload.userId,
      limit: payload.limit,
      selfUserId: loggedInUserId,
      next,
    });
    if (response.isError) {
      toast.error(response.msg);
      return;
    }
    const entities = normalizeProfileFollowers(response.data.followers);
    const ids = Object.keys(entities);
    return {
      entities,
      ids,
      next: response.data.next,
      hasNext: response.data.hasNext,
    };
  }
);
