import { runAsync } from "lib";
import { fetchFromAPI } from ".";

const logout = async () => {
  const response = await runAsync(
    fetchFromAPI("/user/logout", { method: "get" })
  );

  return response;
};

export default logout;
