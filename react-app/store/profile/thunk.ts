import toast from "react-hot-toast";
import fetchProfileService from "services/profile/fetch-profile";
import fetchUserDropsPaginatedService from "services/profile/fetch-user-drops-paginated";
import fetchUserFollowersPaginatedService from "services/profile/fetch-user-followers";
import followUserService from "services/profile/follow-user";
import unFollowUserService from "services/profile/unfollow-user";
import reactOnDropService from "services/reaction/react-on-drop";
import toggleReactionOnDropService from "services/reaction/toggle-reaction";
import unReactDropService from "services/reaction/unreact-drop";
import { IDrop } from "store/drops/slice";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { addDropReaction, IFollower, initDropsAdd, initFollowersAdd, IUser, pushDrops, toggleDropReacted, unReactDropReaction, updateFollowingStatus, updateLoadingDrops, updateLoadingFollowers, updateLoadingProfile, updateLoadingUserFollow, updateMoreDropsInfo, updateMoreFollowersInfo, updateProfileAndSelfRelation, updateReactionLoading, updateUser } from "./slice";

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

export const fetchUserMoreDropsThunk = createAsyncThunk(
  "profile/fetchMoreDrops",
  async (userId: string, { dispatch, getState }) => {
    const selfUserId = (getState() as any).user.info.id;
    const next = (getState() as any).profile.dropsNext;
    const limit = 4;
    const response = await fetchUserDropsPaginatedService({
      userId,
      next,
      limit,
      selfUserId,
    });

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
      dispatch(pushDrops(drops));
    }
  }
);

export const toggleReactionOnDropThunk = createAsyncThunk(
  "profile/toggleDropReaction",
  async (
    {
      dropId,
      reaction,
      oldReaction,
    }: { dropId: string; reaction: string; oldReaction: string },
    { dispatch, getState }
  ) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      toggleDropReacted({
        dropId,
        reaction: { reaction, id: "", oldReaction, countUpdated: false },
      })
    );

    dispatch(updateReactionLoading(true));
    const response = await toggleReactionOnDropService(token, dropId, reaction);
    console.log(response);
    dispatch(updateReactionLoading(false));

    // toggle drop of dropId reacted state to update
    const newReaction = response.data.reaction;
    dispatch(
      toggleDropReacted({
        dropId,
        reaction: {
          reaction: newReaction.reaction,
          id: newReaction.id,
          oldReaction,
          countUpdated: true,
        },
      })
    );
  }
);

export const reactOnDropThunk = createAsyncThunk(
  "profile/react",
  async (
    { dropId, reaction }: { dropId: string; reaction: string },
    { dispatch, getState }
  ) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      addDropReaction({
        dropId,
        reaction: { reaction, id: "", countUpdated: false },
      })
    );

    dispatch(updateReactionLoading(true));
    const response = await reactOnDropService(token, dropId, reaction);
    dispatch(updateReactionLoading(false));

    // toggle drop of dropId reacted state to update
    const newReaction = response.data.reaction;
    dispatch(
      addDropReaction({
        dropId,
        reaction: {
          reaction: newReaction.reaction,
          id: newReaction.id,
          countUpdated: true,
        },
      })
    );
  }
);

export const unReactDropReactionThunk = createAsyncThunk(
  "profile/unreact",
  async (
    { dropId, reaction }: { dropId: string; reaction: string },
    { dispatch, getState }
  ) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      unReactDropReaction({
        dropId,
        reaction: { reaction, countUpdated: false },
      })
    );

    dispatch(updateReactionLoading(true));
    await unReactDropService(token, dropId);
    dispatch(updateReactionLoading(false));

    dispatch(
      unReactDropReaction({
        dropId,
        reaction: { reaction, countUpdated: true },
      })
    );
  }
);

export const fetchUserFollowersThunk = createAsyncThunk(
  "profile/followersAdded",
  async (
    { init, userId }: { init: boolean; userId: string },
    { dispatch, getState }
  ) => {
    dispatch(updateLoadingFollowers(true));

    const selfUserId = (getState() as any).user.info.id;
    const next = (getState() as any).drops.next;
    const limit = 4;

    const response = await fetchUserFollowersPaginatedService(
      init ? { userId, limit, selfUserId } : { userId, next, limit, selfUserId }
    );

    dispatch(updateLoadingFollowers(false));

    if (response.isError) toast.error(response.msg);
    else {
      // transform drop
      let followers: IFollower[] = [];
      for (let i = 0; i < response.data.followers.length; i++) {
        const id = response.data.followers[i].id;
        const follower = response.data.followers[i].follower;
        const followed = response.data.followers[i].followed;
        const isFollowing = response.data.followers[i].isFollowing;
        const relationshipId = response.data.followers[i].relationshipId;
        const createdAt = response.data.followers[i].createdAt;
        const updatedAt = response.data.followers[i].updatedAt;

        followers.push({
          id,
          createdAt,
          updatedAt,
          follower: {
            id: follower.id,
            email: follower.email,
            username: follower.username,
            profilePic: follower.profilePic
              ? {
                  id: follower.profilePic.id,
                  URL: follower.profilePic.URL,
                }
              : {
                  id: "",
                  URL: "https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
                },
            role: follower.role,
            createdAt: follower.createdAt,
            updatedAt: follower.updatedAt,
          },
          followed: {
            id: followed.id,
            email: followed.email,
            username: followed.username,
            profilePic: followed.profilePic
              ? {
                  id: followed.profilePic.id,
                  URL: followed.profilePic.URL,
                }
              : {
                  id: "",
                  URL: "https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
                },
            role: followed.role,
            createdAt: followed.createdAt,
            updatedAt: followed.updatedAt,
          },
          isFollowing,
          relationshipId,
        });
      }

      dispatch(
        updateMoreFollowersInfo({
          next: response.data.next,
          hasNext: response.data.hasNext,
        })
      );
      dispatch(initFollowersAdd(followers));
    }
  }
);
