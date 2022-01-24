import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  token: string;
  info: {
    id: string;
    email: string;
    username: string;
    profilePic: { id: string; URL: string };
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

const initialState: IUserState = {
  token: null,
  info: {
    id: null,
    email: null,
    username: null,
    profilePic: { id: null, URL: null },
    role: null,
    createdAt: null,
    updatedAt: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IUserState>) => {
      state = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
