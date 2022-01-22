import { IConfirmResetPasswordFormData } from "@context/confirm-reset-password";
import { IForgotPasswordFormData } from "@context/forgot-password";
import { axiosBaseInstance } from ".";
import { runAsync } from "..";

export const forgotPasswordHandler = async (data: IForgotPasswordFormData) => {
  const api = axiosBaseInstance();

  const response = await runAsync(
    api(`/user/reset-password`, {
      method: "POST",
      data,
      headers: { "Content-Type": "application/json" },
    })
  );

  return response;
};

export const confirmResetPasswordHandler = async (
  data: IConfirmResetPasswordFormData
) => {
  const api = axiosBaseInstance();

  const response = await runAsync(
    api(data.url, {
      method: "POST",
      data: { password: data.password },
      headers: { "Content-Type": "application/json" },
    })
  );

  return response;
};
