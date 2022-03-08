import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../api/articles";
import ArticleListItem from "./ArticleListItem";
import TrendingArticle from "./TrendingArticle";

function ArticlesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [trendingArticle, setTrendingArticle] = useState({});
  const { topic } = useParams();

  //fetch article data
  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
    });
  }, [topic]);

  return isLoading ? <div uk-spinner="ratio: 3" className="uk-position-center"></div> : (
    <>
      <div className="uk-flex uk-flex-column uk-flex-middle uk-margin-medium-top">
        <TrendingArticle trendingArticle={trendingArticle} />

        {articles.map((article) => {
          return <ArticleListItem article={article} key={article.article_id} />;
        })}
      </div>
    </>
  );
}

export default ArticlesList;
