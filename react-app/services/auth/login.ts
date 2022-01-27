import fetchFromAPI from "lib/services";

export interface ILoginData {
  email: string;
  password: string;
}

const loginService = async (data: ILoginData) => {
  return await fetchFromAPI("/user/login", {
    method: "post",
    data,
    headers: { "Content-Type": "application/json" },
  });
};

export default loginService;
