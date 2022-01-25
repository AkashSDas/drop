import fetchFromAPI from "lib/services";

export interface ICreateDropData {
  content: string;
}

const createDropService = async (token: string, data: ICreateDropData) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/drop`;
  return await fetchFromAPI(url, {
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default createDropService;
