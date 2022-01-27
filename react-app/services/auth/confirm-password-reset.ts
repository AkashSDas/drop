import fetchFromAPI from "lib/services";

export interface IConfirmPasswordResetData {
  url: string;
  password: string;
}

const confirmPasswordResetService = async (data: IConfirmPasswordResetData) => {
  return await fetchFromAPI(data.url, {
    method: "post",
    data: { password: data.password },
    headers: { "Content-Type": "application/json" },
  });
};

export default confirmPasswordResetService;
