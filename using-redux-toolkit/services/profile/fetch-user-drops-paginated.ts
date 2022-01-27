import fetchFromAPI from "lib/services";

interface IFetchUserDropsPaginatedParams {
  userId: string;
  next?: string;
  limit?: number;
  selfUserId?: string;
}

const fetchUserDropsPaginatedService = async (
  params?: IFetchUserDropsPaginatedParams
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/drop/user/${params.userId}?`;
  url = `${url}limit=${params.limit ?? 10}`;
  if (params.next && params.userId) {
    url = `${url}&next=${params.next}&user=${params.selfUserId}`;
  } else if (params.next) url = `${url}&next=${params.next}`;
  else if (params.userId) url = `${url}&user=${params.selfUserId}`;

  return await fetchFromAPI(url, { method: "get" });
};

export default fetchUserDropsPaginatedService;
