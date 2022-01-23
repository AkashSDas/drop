import { runAsync } from "lib";
import { fetchFromAPI } from ".";

export interface IForgotPasswordData {
  email: string;
}

const resetForgotPassword = async (data: IForgotPasswordData) => {
  const response = await runAsync(
    fetchFromAPI("/user/reset-password", {
      method: "post",
      data,
      headers: { "Content-Type": "application/json" },
    })
  );

  return response;
};

export default resetForgotPassword;
