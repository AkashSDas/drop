import fetchFromAPI from "lib/services";

export interface ISignupData {
  username: string;
  email: string;
  password: string;
}

const signupService = async (data: ISignupData) => {
  return await fetchFromAPI("/user/signup", {
    method: "post",
    data,
    headers: { "Content-Type": "application/json" },
  });
};

export default signupService;
