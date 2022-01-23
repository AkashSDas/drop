import { runAsync } from "lib";
import { fetchFromAPI } from ".";

export interface IConfirmPasswordReset {
  url: string;
  password: string;
}

const confirmPasswordReset = async (data: IConfirmPasswordReset) => {
  const response = await runAsync(
    fetchFromAPI(data.url, {
      method: "post",
      data: { password: data.password },
      headers: { "Content-Type": "application/json" },
    })
  );

  return response;
};

export default confirmPasswordReset;
