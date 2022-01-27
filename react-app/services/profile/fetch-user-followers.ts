import fetchFromAPI from "lib/services";

interface IFetchUserFollowersPaginatedParams {
  userId: string;
  next?: string;
  limit?: number;
  selfUserId?: string;
}

const fetchUserFollowersPaginatedService = async (
  params?: IFetchUserFollowersPaginatedParams
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/relationship/user/${params.userId}/followers?`;
  url = `${url}limit=${params.limit ?? 10}`;
  if (params.next && params.selfUserId) {
    url = `${url}&next=${params.next}&user=${params.selfUserId}`;
  } else if (params.next) url = `${url}&next=${params.next}`;
  else if (params.selfUserId) url = `${url}&user=${params.selfUserId}`;

  return await fetchFromAPI(url, { method: "get" });
};

export default fetchUserFollowersPaginatedService;
