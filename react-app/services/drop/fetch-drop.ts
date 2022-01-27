import fetchFromAPI from "lib/services";

interface IFetchDropParams {
  userId?: string;
  dropId: string;
}

const fetchDropService = async (params?: IFetchDropParams) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/drop/${params.dropId}?`;
  if (params.userId) url = `${url}user=${params.userId}`;
  return await fetchFromAPI(url, { method: "get" });
};

export default fetchDropService;
