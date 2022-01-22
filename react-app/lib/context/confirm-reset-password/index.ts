export interface IConfirmResetPasswordFormData {
  url: string;
}

export interface IConfirmResetPasswordState {
  loading: boolean;
}

export const confirmResetPasswordInitialState = {
  loading: null,
};
