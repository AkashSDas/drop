import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import fetchProfileService from "services/profile/fetch-profile";
import {
  IUser,
  updateLoadingProfile,
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
        })
      );
      dispatch(updateUser(user));
    }
  }
);
