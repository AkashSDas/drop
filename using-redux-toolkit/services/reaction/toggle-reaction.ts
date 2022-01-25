import fetchFromAPI from "lib/services";

const toggleReactionOnDropService = async (
  token: string,
  dropId: string,
  reaction: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/reaction/drop/${dropId}`;
  const deleteRes = await fetchFromAPI(url, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (deleteRes.isError) return deleteRes;

  return await fetchFromAPI(url, {
    method: "post",
    data: { reaction },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export default toggleReactionOnDropService;
