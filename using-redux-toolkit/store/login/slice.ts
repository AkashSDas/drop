import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import login, { ILoginData } from "lib/service/login";
import toast from "react-hot-toast";
import { AppDispatch } from "store";

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
        // Login user in the app & save info in local storage
        toast.success(response.result.data.msg);
      }
    }
  }
);
