import api from "./api";

export const fetchArticles = async (topic, {sort_by, order}) => {
  if (!topic) {
    const {
      data: { articles },
    } = await api.get(`/articles?sort_by=${sort_by}&order=${order}`);
    return articles;
  } else {
    const {
      data: { articles },
    } = await api.get(`/articles?topic=${topic}&sort_by=${sort_by}&order=${order}`);
    return articles;
  }
};

export const fetchArticle = async (articleId) => {
  const {
    data: { article },
  } = await api.get(`/articles/${articleId}`);
  return article;
};

export const patchArticleVotes = async (articleId, inc_votes) => {
  await api.patch(`/articles/${articleId}`, { inc_votes });
  return;
};
