import { runAsync } from "lib";
import { fetchFromAPI } from ".";

export interface ILoginData {
  email: string;
  password: string;
}

const login = async (data: ILoginData) => {
  const response = await runAsync(
    fetchFromAPI("/user/login", {
      method: "post",
      data,
      headers: { "Content-Type": "application/json" },
    })
  );

  return response;
};

export default login;
