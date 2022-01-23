import { runAsync } from "lib";
import { fetchFromAPI } from ".";

export interface ISignupData {
  username: string;
  email: string;
  password: string;
}

const signup = async (data: ISignupData) => {
  const response = await runAsync(
    fetchFromAPI("/user/signup", {
      method: "post",
      data,
      headers: { "Content-Type": "application/json" },
    })
  );

  return response;
};

export default signup;
