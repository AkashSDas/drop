export interface IUserState {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    profilePicURL: {
      id: string;
      URL: string;
    };
    active: boolean;
    role: "member" | "elder" | "co-leader" | "leader";
  };
}

export const userInitialState = {
  token: null,
  user: {
    id: null,
    username: null,
    email: null,
    profilePicURL: null,
    active: null,
    role: null,
  },
};
