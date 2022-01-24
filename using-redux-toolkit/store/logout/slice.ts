import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeUserFromLocalStorage } from "lib/base/local-storage";
import logout from "lib/service/logout";
import toast from "react-hot-toast";
import { initialState as userInitialState, setUser } from "../user/slice";

export interface LogoutState {
  loading: boolean;
}

const initialState: LogoutState = {
  loading: false,
};

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateLoading } = logoutSlice.actions;
export default logoutSlice.reducer;

// Thunks

export const logoutUser = createAsyncThunk(
  "logout/user",
  async (_, { dispatch }) => {
    dispatch(updateLoading(true));
    const response = await logout();
    dispatch(updateLoading(false));
    if (response.error) {
      toast.error(response.error.response.data.msg);
    } else {
      if (response.result.isError) {
        toast.error(response.result.data.msg);
      } else {
        toast.success(response.result.data.msg);
        removeUserFromLocalStorage();
        dispatch(setUser(userInitialState));
        return true;
      }
    }
    return false;
  }
);
