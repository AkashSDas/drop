import { axiosBaseInstance } from ".";
import { runAsync } from "..";

const logout = async () => {
  const api = axiosBaseInstance();
  const response = await runAsync(api(`/user/logout`, { method: "GET" }));
  return response;
};
export default logout;
