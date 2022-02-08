import { IAuthor } from "store/drops/types";

export interface IComment {
  id: string;
  dropId: string;
  content: string;
  user: IAuthor;
  hasCommented: boolean;
  createdAt: string;
  updatedAt: string;
  isDeleting: boolean;
}

interface ICommentsState {
  ids: string[];
  entities: { [id: string]: IComment };
  isLoading: boolean;
  next: string | null;
  hasNext: boolean;
}
