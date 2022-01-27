import fetchFromAPI from "lib/services";

const unReactDropService = async (token: string, dropId: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/reaction/drop/${dropId}`;
  return await fetchFromAPI(url, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default unReactDropService;
