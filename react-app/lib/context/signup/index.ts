export interface ISignupFormData {
  username: string;
  email: string;
  password: string;
}

export interface ISignupState {
  loading: boolean;
}

export const signupInitialState = {
  loading: null,
};
