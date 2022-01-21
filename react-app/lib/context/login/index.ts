export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ILoginState {
  loading: boolean;
  error: any;
  data: ILoginFormData;
}

export const loginInitialState = {
  loading: null,
  error: null,
  data: {
    email: null,
    password: null,
  },
};
