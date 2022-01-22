export interface IForgotPasswordFormData {
  email: string;
}

export interface IForgotPasswordState {
  loading: boolean;
}

export const forgotPasswordInitialState = {
  loading: null,
};
