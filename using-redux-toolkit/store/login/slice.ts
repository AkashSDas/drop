import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveUserToLocalStorage } from "lib/local-storage";
import login, { ILoginData } from "lib/service/login";
import toast from "react-hot-toast";
import { setUser, UserState } from "store/user/slice";

interface LoginState {
  loading: boolean;
}

const initialState: LoginState = {
  loading: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loginSlice.actions;
export default loginSlice.reducer;

// Thunks

export const loginUser = createAsyncThunk(
  "login/user",
  async (data: ILoginData, { dispatch }) => {
    dispatch(setLoading(true));
    const response = await login(data);
    dispatch(setLoading(false));
    if (response.error) {
      toast.error(response.error.response.data.msg);
    } else {
      if (response.result.isError) {
        toast.error(response.result.data.msg);
      } else {
        toast.success(response.result.data.msg);
        const data = response.result.data.data.user;
        const user: UserState = {
          token: data.token,
          info: {
            id: data.user.id,
            email: data.user.email,
            username: data.user.username,
            profilePic: data.user.profilePic,
            role: data.user.role,
            updatedAt: data.user.updatedAt,
            createdAt: data.user.createdAt,
          },
        };
        saveUserToLocalStorage(user);
        dispatch(setUser(user));
      }
    }
  }
);
