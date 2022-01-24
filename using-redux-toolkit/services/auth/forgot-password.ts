import fetchFromAPI from "lib/services";

export interface IForgotPasswordData {
  email: string;
}

const forgotPasswordService = async (data: IForgotPasswordData) => {
  return await fetchFromAPI("/user/reset-password", {
    method: "post",
    data,
    headers: { "Content-Type": "application/json" },
  });
};

export default forgotPasswordService;
