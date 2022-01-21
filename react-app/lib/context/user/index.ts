export interface IUserState {
  id: string;
  username: string;
  email: string;
  profilePicURL: {
    id: string;
    URL: string;
  };
  active: boolean;
  role: "member" | "elder" | "co-leader" | "leader";
}

export const userInitialState = {
  id: null,
  username: null,
  email: null,
  profilePicURL: null,
  active: null,
  role: null,
};
