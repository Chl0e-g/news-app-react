import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../api/articles";
import ArticleListItem from "./ArticleListItem";
import TrendingArticle from "./TrendingArticle";
import ArticlesNav from "./ArticlesNav";
import SortDropDown from "./SortDropDown";
import Error from "./Error";

function ArticlesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [trendingArticle, setTrendingArticle] = useState({});
  const [sortBy, setSortBy] = useState("Most likes");
  const [error, setError] = useState(false);
  const { topic } = useParams();

  //fetch article data
  useEffect(() => {
    //sortBy query params
    const sortByQuery = {
      "Most likes": { sort_by: "votes", order: "desc" },
      "Most comments": { sort_by: "comment_count", order: "desc" },
      "Newest first": { sort_by: "created_at", order: "desc" },
      "Oldest first": { sort_by: "created_at", order: "asc" },
    };
    setError(false)
    setIsLoading(true);
    fetchArticles(topic, sortByQuery[sortBy])
      .then((articlesData) => {
        setArticles(articlesData);

        if (!topic) {
          //set trending article
          const articlesByVotes = [...articlesData].sort(
            (a, b) => b.votes - a.votes
          );
          setTrendingArticle(articlesByVotes.at(0));
          const trendingArticleId = articlesByVotes.at(0).article_id;

          //remove trending article from rest of articles data
          setArticles((currentArticles) => {
            const filteredArticles = [...currentArticles].filter((article) => {
              if (article.article_id !== trendingArticleId) return article;
              else return null;
            });
            return filteredArticles;
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response);
      });
  }, [topic, sortBy]);

  return error ? (
    <Error error={error}/>
  ) : (
    <>
      <ArticlesNav />
      <main className="uk-margin-large-bottom">
        <div className="uk-flex uk-flex-column uk-flex-middle uk-margin-medium-top ">
          {topic ? (
            <h2 className="uk-text-uppercase uk-text-lead uk-text-light">
              {topic}
            </h2>
          ) : null}
          <SortDropDown sortBy={sortBy} setSortBy={setSortBy} />
          {isLoading ? (
            <div
              uk-spinner="ratio: 3"
              className="uk-position-center uk-margin-remove"
            ></div>
          ) : (
            <>
              {!topic ? (
                <TrendingArticle trendingArticle={trendingArticle} />
              ) : null}

              {articles.map((article) => {
                return (
                  <ArticleListItem article={article} key={article.article_id} />
                );
              })}
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default ArticlesList;
