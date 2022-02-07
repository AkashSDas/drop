export interface IAuthor {
  id: string;
  email: string;
  username: string;
  role: string;
  profilePic: { id: string; URL: string };
  createdAt: string;
  updatedAt: string;
}

export interface IReaction {
  name: string;
  emoji: string;
  count: number;
}

export interface IDrop {
  id: string;
  content: string;
  user: IAuthor;
  reactions: IReaction[];
  reacted: { reaction: string; id: string } | null;
  updatingReaction: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IDropsState {
  ids: string[];
  entities: { [id: string]: IDrop };
  isLoading: boolean;
  next: string | null;
  hasNext: boolean;
}

export interface IChangeReactionToNew {
  dropId: string;
  reaction: {
    newReactionId: string;
    newReaction: string;
    oldReaction: string;
    countUpdated: boolean;
  };
}
