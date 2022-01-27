import fetchFromAPI from "lib/services";

const getCommentService = async (commentId: string) => {
  return await fetchFromAPI(`/comment/${commentId}`, { method: "get" });
};

export default getCommentService;
