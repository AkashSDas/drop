import { axiosBaseInstance } from ".";
import { runAsync } from "..";
import { ISignupFormData } from "../context/signup";

const signup = async (data: ISignupFormData) => {
  const api = axiosBaseInstance();

  const response = await runAsync(
    api(`/user/signup`, {
      method: "POST",
      data,
      headers: { "Content-Type": "application/json" },
    })
  );

  return response;
};
export default signup;
