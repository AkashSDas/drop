import fetchFromAPI from "lib/services";

const reactOnDropService = async (
  token: string,
  dropId: string,
  reaction: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/reaction/drop/${dropId}`;
  return await fetchFromAPI(url, {
    method: "post",
    data: { reaction },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export default reactOnDropService;
