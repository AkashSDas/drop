import fetchFromAPI from "lib/services";

interface IFollowUserParams {
  token: string;
  followedId: string;
}

const followUserService = async (params: IFollowUserParams) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/relationship/user/${params.followedId}`;
  return await fetchFromAPI(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  });
};

export default followUserService;
