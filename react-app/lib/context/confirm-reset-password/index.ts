export interface IConfirmResetPasswordFormData {
  url: string;
  password: string; // new password
}

export interface IConfirmResetPasswordState {
  loading: boolean;
}

export const confirmResetPasswordInitialState = {
  loading: null,
};
