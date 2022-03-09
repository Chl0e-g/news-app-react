import api from "./api";

export const fetchComments = async (articleId) => {
  const {
    data: { comments },
  } = await api.get(`/articles/${articleId}/comments`);
  return comments;
};
