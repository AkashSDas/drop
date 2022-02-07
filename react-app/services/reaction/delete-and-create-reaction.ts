import fetchFromAPI from "lib/services";

export interface IDeleteAndCreateReactionConfig {
  token: string;
  dropId: string;
  reaction: string;
}

const deleteAndCreateReactionService = async (
  config: IDeleteAndCreateReactionConfig
) => {
  const { dropId, reaction, token } = config;

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

export default deleteAndCreateReactionService;
