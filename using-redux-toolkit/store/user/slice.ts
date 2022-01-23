import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
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

const initialState: UserState = {
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
    setUser: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
      state.info = action.payload.info;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
