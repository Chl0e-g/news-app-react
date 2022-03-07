import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../api/articles";
import ArticleListItem from "./ArticleListItem";
import TrendingArticle from "./TrendingArticle";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [trendingArticle, setTrendingArticle] = useState({});
  const { topic } = useParams()

  //fetch article data
  useEffect(() => {
    fetchArticles(topic).then((articlesData) => {
      setArticles(articlesData);

      //set trending article
      articlesData.sort((a, b) => b.comment_count - a.comment_count);
      setTrendingArticle(articlesData.at(0));
      const trendingArticleId = articlesData.at(0).article_id;

      //remove trending article from rest of articles data
      setArticles((currentArticles) => {
        const filteredArticles = [...currentArticles].filter((article) => {
          if (article.article_id !== trendingArticleId) return article;
          else return null;
        });
        return filteredArticles;
      });
    });
  }, [topic]);

  return (
    <>
      <div className="uk-flex uk-flex-column uk-flex-middle uk-margin-medium-top">
        <TrendingArticle trendingArticle={trendingArticle} />

        {articles.map((article) => {
          return <ArticleListItem article={article} />;
        })}
      </div>
    </>
  );
}

export default ArticlesList;
