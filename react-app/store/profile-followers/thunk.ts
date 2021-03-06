import { normalizeProfileFollowers } from "lib/normalize/profile";
import toast from "react-hot-toast";
import fetchUserFollowersPaginatedService from "services/profile/fetch-user-followers";
import followUserService from "services/profile/follow-user";
import unFollowUserService from "services/profile/unfollow-user";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { changeIsUpdatingStatus } from "./slice";

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

export const followUserInProfileFollowers = createAsyncThunk(
  "profileFollowers/followUserInProfileFollowers",
  async (
    payload: { relationshipId: string; followedId: string },
    { getState }
  ) => {
    const { followedId, relationshipId } = payload;
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return null;
    }

    changeIsUpdatingStatus({ id: relationshipId, status: true });
    const response = await followUserService({ followedId, token });
    changeIsUpdatingStatus({ id: relationshipId, status: false });
    if (response.isError) {
      toast.error(response.msg);
      return null;
    }

    toast.success(response.msg);
    return {
      relationshipId,
      loggedInUserAndFollowerRelationshipId: response.data.relationship.id,
      following: true,
    };
  }
);

export const unFollowUserInProfileFollowers = createAsyncThunk(
  "profileFollowers/unFollowUserInProfileFollowers",
  async (
    payload: { relationshipId: string; entityId: string },
    { getState }
  ) => {
    const { entityId, relationshipId } = payload;
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return null;
    }

    changeIsUpdatingStatus({ id: entityId, status: true });
    const response = await unFollowUserService({ relationshipId, token });
    changeIsUpdatingStatus({ id: entityId, status: false });
    if (response.isError) {
      toast.error(response.msg);
      return null;
    }

    toast.success(response.msg);
    return {
      relationshipId: entityId,
      loggedInUserAndFollowerRelationshipId: null,
      following: false,
    };
  }
);
