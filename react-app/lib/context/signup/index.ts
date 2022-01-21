export interface ISignupFormData {
  username: string;
  email: string;
  password: string;
}

export interface ISignupState {
  loading: boolean;
  error: any;
  data: ISignupFormData;
}

export const signupInitialState = {
  loading: null,
  error: null,
  data: {
    username: null,
    email: null,
    password: null,
  },
};
