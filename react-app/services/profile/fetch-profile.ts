import fetchFromAPI from "lib/services";

const fetchProfileService = async (userId: string, selfUserId?: string) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`;
  if (selfUserId) url = `${url}?user=${selfUserId}`;
  return await fetchFromAPI(url, { method: "get" });
};

export default fetchProfileService;
