import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDrop {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    username: string;
    profilePic: { id: string; URL: string };
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  reactionsOnDrop: { name: string; emoji: string; count: number }[];
  reacted: null | { reaction: string; id: string };
}

interface IDropsState {
  loading: boolean;
  next: string | null;
  hasNext: boolean;
  drops: IDrop[];
}

const initialState: IDropsState = {
  loading: false,
  next: null,
  hasNext: false,
  drops: [],
};

export const dropsSlice = createSlice({
  name: "drops",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateMoreDropsInfo: (
      state,
      action: PayloadAction<{ next: string | null; hasNext: boolean }>
    ) => {
      state.hasNext = action.payload.hasNext;
      state.next = action.payload.next;
    },
    addDrops: (state, action: PayloadAction<IDrop[]>) => {
      state.drops = [...state.drops, ...action.payload];
    },
  },
});

export const { updateLoading, addDrops, updateMoreDropsInfo } =
  dropsSlice.actions;
export default dropsSlice.reducer;
