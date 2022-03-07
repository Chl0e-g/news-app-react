import { useState, useEffect } from "react";
import { fetchArticles } from "../api/articles";
import ArticleListItem from "./ArticleListItem";
import TrendingArticle from "./TrendingArticle";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [trendingArticle, setTrendingArticle] = useState({});

  //fetch article data
  useEffect(() => {
    fetchArticles().then((articlesData) => {
      setArticles(articlesData);

      //set trending article
      articlesData.sort((a, b) => b.comment_count - a.comment_count);
      setTrendingArticle(articlesData.at(0));
      const trendingArticleId = articlesData.at(0).article_id;

      //remove trending article from rest of articles data
      setArticles((currentArticles) => {
        const filteredArticles = [...currentArticles].filter((article) => {
          if (article.article_id !== trendingArticleId) return article;
        });
        return filteredArticles
      });
    });
  }, []);

  return (
    <>
      <div className="uk-flex uk-flex-column uk-flex-middle ">
        <TrendingArticle trendingArticle={trendingArticle} />

        {articles.map((article) => {
          return <ArticleListItem article={article} />;
        })}
      </div>
    </>
  );
}

export default ArticlesList;
