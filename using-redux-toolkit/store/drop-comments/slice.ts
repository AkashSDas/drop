import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IComment {
  id: string;
  dropId: string;
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
  commented: boolean;
}

interface IDropCommentsState {
  loading: boolean;
  actionLoading: boolean;
  comments: IComment[];
  next: string | null;
  hasNext: boolean;
}

const initialState: IDropCommentsState = {
  loading: false,
  actionLoading: false,
  comments: [],
  next: null,
  hasNext: false,
};

export const dropCommentsSlice = createSlice({
  name: "dropComments",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateActionLoading: (state, action: PayloadAction<boolean>) => {
      state.actionLoading = action.payload;
    },
    updateMoreCommentsInfo: (
      state,
      action: PayloadAction<{ next: string | null; hasNext: boolean }>
    ) => {
      state.hasNext = action.payload.hasNext;
      state.next = action.payload.next;
    },
    initAdd: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    removeComment: (state, action: PayloadAction<{ commentId: string }>) => {
      state.comments = state.comments.filter(
        (c) => c.id !== action.payload.commentId
      );
    },
    pushComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = [...state.comments, ...action.payload];
    },
  },
});

export const {
  initAdd,
  pushComments,
  removeComment,
  updateActionLoading,
  updateLoading,
  updateMoreCommentsInfo,
} = dropCommentsSlice.actions;
export default dropCommentsSlice.reducer;
