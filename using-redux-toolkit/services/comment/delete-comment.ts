import fetchFromAPI from "lib/services";

interface IDeleteCommentParams {
  commentId: string;
  token: string;
}

const deleteCommentService = async (params: IDeleteCommentParams) => {
  return await fetchFromAPI(`/comment/${params.commentId}`, {
    method: "delete",
    headers: { Authorization: `Bearer ${params.token}` },
  });
};

export default deleteCommentService;
