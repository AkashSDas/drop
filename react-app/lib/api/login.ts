import { axiosBaseInstance } from ".";
import { runAsync } from "..";
import { ILoginFormData } from "@context/login";

const login = async (data: ILoginFormData) => {
  const api = axiosBaseInstance();

  const response = await runAsync(
    api(`/user/login`, {
      method: "POST",
      data,
      headers: { "Content-Type": "application/json" },
    })
  );

  return response;
};
export default login;
