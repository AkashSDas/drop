export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ILoginState {
  loading: boolean;
}

export const loginInitialState = {
  loading: null,
};
