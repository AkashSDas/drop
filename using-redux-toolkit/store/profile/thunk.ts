import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import fetchProfileService from "services/profile/fetch-profile";
import fetchUserDropsPaginatedService from "services/profile/fetch-user-drops-paginated";
import followUserService from "services/profile/follow-user";
import unFollowUserService from "services/profile/unfollow-user";
import { IDrop } from "store/drops/slice";
import {
  initDropsAdd,
  IUser,
  updateFollowingStatus,
  updateLoadingDrops,
  updateLoadingProfile,
  updateLoadingUserFollow,
  updateMoreDropsInfo,
  updateProfileAndSelfRelation,
  updateUser,
} from "./slice";

export const fetchProfileUserThunk = createAsyncThunk(
  "profile/fetchUser",
  async (userId: string, { dispatch, getState }) => {
    const selfUserId = (getState() as any).user.info?.id;
    dispatch(updateLoadingProfile(true));
    const response = await fetchProfileService(userId, selfUserId);
    dispatch(updateLoadingProfile(false));
    if (response.isError) toast.error(response.msg);
    else {
      const data = response.data.user;
      const user: IUser = {
        id: data.id,
        createdAt: data.createdAt,
        email: data.email,
        profilePic: data.profilePic
          ? {
              id: data.profilePic.id,
              URL: data.profilePic.URL,
            }
          : {
              id: "",
              URL: "https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
            },
        role: data.role,
        updatedAt: data.updatedAt,
        username: data.username,
      };
      dispatch(
        updateProfileAndSelfRelation({
          following: response.data.following,
          self: response.data.self,
          relationshipId: response.data.relationshipId,
        })
      );
      dispatch(updateUser(user));
    }
  }
);

export const followUserThunk = createAsyncThunk(
  "profile/followUser",
  async (followedId: string, { dispatch, getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(updateLoadingUserFollow(true));
    const response = await followUserService({ followedId, token });
    dispatch(updateLoadingUserFollow(false));
    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      dispatch(
        updateFollowingStatus({
          relationshipId: response.data.relationship.id,
          following: true,
        })
      );
    }
  }
);

export const unFollowUserThunk = createAsyncThunk(
  "profile/unFollowUser",
  async (_, { dispatch, getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    const relationshipId = (getState() as any).profile.relationshipId;

    dispatch(updateLoadingUserFollow(true));
    const response = await unFollowUserService({ relationshipId, token });
    dispatch(updateLoadingUserFollow(false));
    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      dispatch(
        updateFollowingStatus({ relationshipId: null, following: false })
      );
    }
  }
);

export const fetchUserDropsThunk = createAsyncThunk(
  "profile/dropsAdded",
  async (
    { init, userId }: { init: boolean; userId: string },
    { dispatch, getState }
  ) => {
    dispatch(updateLoadingDrops(true));

    const selfUserId = (getState() as any).user.info.id;
    const next = (getState() as any).drops.next;
    const limit = 4;

    const response = await fetchUserDropsPaginatedService(
      init ? { userId, limit, selfUserId } : { userId, next, limit, selfUserId }
    );

    dispatch(updateLoadingDrops(false));

    if (response.isError) toast.error(response.msg);
    else {
      // transform drop
      let drops: IDrop[] = [];
      for (let i = 0; i < response.data.drops.length; i++) {
        const drop = response.data.drops[i].drop;
        const reactionsOnDrop = response.data.drops[i].reactionsOnDrop;
        const reacted = response.data.drops[i].reacted;

        let reactionsOnDropArr: {
          name: string;
          emoji: string;
          count: number;
        }[] = [];
        for (const reaction in reactionsOnDrop) {
          reactionsOnDropArr.push({
            name: reactionsOnDrop[reaction].name,
            emoji: reactionsOnDrop[reaction].emoji,
            count: reactionsOnDrop[reaction].count,
          });
        }

        drops.push({
          id: drop.id,
          content: drop.content,
          createdAt: drop.createdAt,
          updatedAt: drop.updatedAt,
          user: {
            id: drop.user.id,
            email: drop.user.email,
            username: drop.user.username,
            profilePic: {
              id: drop.user.profilePic.id,
              URL: drop.user.profilePic.URL,
            },
            role: drop.user.role,
            createdAt: drop.user.createdAt,
            updatedAt: drop.user.updatedAt,
          },
          reactionsOnDrop: reactionsOnDropArr,
          reacted: !reacted
            ? null
            : { reaction: reacted.reaction, id: reacted.id },
        });
      }

      dispatch(
        updateMoreDropsInfo({
          next: response.data.next,
          hasNext: response.data.hasNext,
        })
      );
      dispatch(initDropsAdd(drops));
    }
  }
);
