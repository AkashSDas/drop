import fetchFromAPI from "lib/services";

interface ICreateCommentParams {
  content: string;
  dropId: string;
  token: string;
  commentId: string;
}

const updateCommentService = async (params: ICreateCommentParams) => {
  return await fetchFromAPI(
    `/comment/${params.commentId}/drop/${params.dropId}`,
    {
      method: "put",
      data: { content: params.content },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.token}`,
      },
    }
  );
};

export default updateCommentService;
