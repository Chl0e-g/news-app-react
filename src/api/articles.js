import api from "./api";

export const fetchArticles = async (topic) => {
  if (!topic) {
    const {
      data: { articles },
    } = await api.get("/articles");
    return articles;
  } else {
    const {
      data: { articles },
    } = await api.get(`/articles?topic=${topic}`);
    return articles;
  }
};
