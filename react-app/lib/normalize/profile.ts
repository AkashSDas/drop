import { IFollower } from "store/profile-followers/slice";

import { normalizeDropAuthor } from "./user";

export const normalizeProfileFollower = (data: any): IFollower => {
  const {
    id,
    follower,
    followed,
    isFollowing,
    relationshipId,
    createdAt,
    updatedAt,
  } = data;

  return {
    id,
    amIFollowing: isFollowing,
    follower: normalizeDropAuthor(follower),
    followed: normalizeDropAuthor(followed),
    relationshipId,
    isUpdatingFollowerStatus: false,
    createdAt,
    updatedAt,
  };
};

export const normalizeProfileFollowers = (
  data: any
): { [id: string]: IFollower } => {
  let followers: { [id: string]: IFollower } = {};
  for (let i = 0; i < data.length; i++) {
    const follower = normalizeProfileFollower(data[i]);
    followers[follower.id] = follower;
  }
  return followers;
};
