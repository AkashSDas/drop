import fetchFromAPI from "../";

const logoutService = async () => {
  return await fetchFromAPI("/user/logout", { method: "get" });
};

export default logoutService;
