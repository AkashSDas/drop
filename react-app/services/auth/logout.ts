import fetchFromAPI from "lib/services";

const logoutService = async () => {
  return await fetchFromAPI("/user/logout", { method: "get" });
};

export default logoutService;
