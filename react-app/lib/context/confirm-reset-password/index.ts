export interface IConfirmResetPasswordFormData {
  email: string;
}

export interface IConfirmResetPasswordState {
  loading: boolean;
}

export const confirmResetPasswordInitialState = {
  loading: null,
};
