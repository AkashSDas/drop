import { ILoginFormData } from ".";

export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_DATA = "SET_DATA";

// Types

interface ISetLoading {
  type: "SET_LOADING";
  playload: boolean;
}

interface ISetError {
  type: "SET_ERROR";
  playload: any;
}

interface ISetData {
  type: "SET_DATA";
  playload: ILoginFormData;
}

export type LoginAction = ISetLoading | ISetError | ISetData;
