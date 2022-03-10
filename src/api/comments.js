import api from "./api";

export const fetchComments = async (articleId) => {
  const {
    data: { comments },
  } = await api.get(`/articles/${articleId}/comments`);
  return comments;
};

export const postComment = async (articleId, comment) => {
    await api.post(`/articles/${articleId}/comments`, comment)
    return
}

export const deleteComment = async (commentId) => {
  await api.delete(`/comments/${commentId}`)
  return
}