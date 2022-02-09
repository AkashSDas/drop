import { normalizeDropAuthor } from "lib/normalize/user";
import toast from "react-hot-toast";
import fetchProfileService from "services/profile/fetch-profile";
import followUserService from "services/profile/follow-user";
import unFollowUserService from "services/profile/unfollow-user";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProfileUser = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userId: string, { getState }) => {
    const loggedInUserId = (getState() as any).user.info?.id;
    const response = await fetchProfileService(userId, loggedInUserId);
    if (response.isError) {
      toast.error(response.msg);
      return null;
    }

    const user = normalizeDropAuthor(response.data.user);
    const relationshipInfo = {
      amIFollowing: response.data.following,
      self: response.data.self,
      relationshipId: response.data.relationshipId,
    };
    return { user, relationshipInfo };
  }
);

export const followProfileUser = createAsyncThunk(
  "profile/followProfileUser",
  async (followedId: string, { getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return null;
    }

    const response = await followUserService({ followedId, token });
    if (response.isError) {
      toast.error(response.msg);
      return null;
    }

    toast.success(response.msg);
    return {
      relationshipId: response.data.relationshipId,
      following: true,
    };
  }
);

export const unFollowProfileUser = createAsyncThunk(
  "profile/unFollowProfileUser",
  async (_, { getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return null;
    }

    const relationshipId = (getState() as any).profile.relationshipId;
    const response = await unFollowUserService({ relationshipId, token });
    if (response.isError) {
      toast.error(response.msg);
      return null;
    }
    toast.success(response.msg);
    return { relationshipId: null, following: false };
  }
);
