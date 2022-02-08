import { normalizeDrop } from "lib/normalize/drop";
import toast from "react-hot-toast";
import createDropService, { ICreateDropData } from "services/drop/create-drop";
import { addNewDrop } from "store/drops/slice";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const createDrop = createAsyncThunk(
  "createDropForm/createDrop",
  async (data: ICreateDropData, { dispatch, getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return { isCreated: false, drop: null };
    }

    const response = await createDropService(token, data);
    if (response.isError) {
      toast.error(response.msg);
      return { isCreated: false, drop: null };
    }

    toast.success(response.msg);
    const drop = normalizeDrop(response.data);
    dispatch(addNewDrop(drop));
    return { isCreated: true, drop };
  }
);
