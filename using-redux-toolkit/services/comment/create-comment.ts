import fetchFromAPI from "lib/services";

interface ICreateCommentParams {
  content: string;
  dropId: string;
  token: string;
}

const createCommentService = async (params: ICreateCommentParams) => {
  return await fetchFromAPI(`/comment/drop/${params.dropId}`, {
    method: "post",
    data: { content: params.content },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
  });
};

export default createCommentService;
