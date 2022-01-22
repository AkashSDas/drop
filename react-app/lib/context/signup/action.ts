export const SET_LOADING = "SET_LOADING";

// Types

interface ISetLoading {
  type: "SET_LOADING";
  playload: boolean;
}

export type SignupAction = ISetLoading;
