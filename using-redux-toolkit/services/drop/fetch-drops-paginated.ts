import fetchFromAPI from "lib/services";

interface IFetchDropsPaginatedParams {
  userId?: string;
  next?: string;
  limit?: number;
}

const fetchDropsPaginatedService = async (
  params?: IFetchDropsPaginatedParams
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/drop?`;
  url = `${url}limit=${params.limit ?? 10}`;
  if (params.next && params.userId) {
    url = `${url}&next=${params.next}&user=${params.userId}`;
  } else if (params.next) url = `${url}&next=${params.next}`;
  else if (params.userId) url = `${url}&user=${params.userId}`;

  return await fetchFromAPI(url, { method: "get" });
};

export default fetchDropsPaginatedService;
