import fetchFromAPI from "lib/services";

interface IUnFollowUserParams {
  token: string;
  relationshipId: string;
}

const unFollowUserService = async (params: IUnFollowUserParams) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/relationship/${params.relationshipId}`;
  return await fetchFromAPI(url, {
    method: "get",
    headers: { Authorization: `Bearer ${params.token}` },
  });
};

export default unFollowUserService;
