import { addNewDrop } from "store/drops/slice";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createDrop } from "./thunk";

interface ICreateDropForm {
  isLoading: boolean;
  isOpen: boolean;
}

const initialState: ICreateDropForm = {
  isLoading: false,
  isOpen: false,
};

export const createDropFormSlice = createSlice({
  name: "createDropForm",
  initialState,
  reducers: {
    updateIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createDrop.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(createDrop.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createDrop.rejected, (state, _) => {
      state.isLoading = false;
    });
  },
});

export const { updateIsOpen } = createDropFormSlice.actions;

export default createDropFormSlice.reducer;
