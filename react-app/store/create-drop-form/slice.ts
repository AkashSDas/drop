import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICreateDropForm {
  loading: boolean;
  isOpen: boolean;
}

const initialState: ICreateDropForm = {
  loading: false,
  isOpen: false,
};

export const createDropFormSlice = createSlice({
  name: "createDropForm",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { updateIsOpen, updateLoading } = createDropFormSlice.actions;
export default createDropFormSlice.reducer;
