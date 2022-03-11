import { fetchArticle, patchArticleVotes } from "../api/articles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { fetchUserByUsername } from "../api/users";
import ArticlesNav from "./ArticlesNav";
import CommentList from "./CommentList";
import Error from "./Error";

function SingleArticle() {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const [numOfLikes, setNumOfLikes] = useState("");
  const [liked, setLiked] = useState(false);
  const { articleId } = useParams();
  const formattedDate = formatDate(article.created_at);
  const [error, setError] = useState(false);

  //fetch article
  useEffect(() => {
    setError(false);
    setIsLoading(true);
    fetchArticle(articleId)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
        setNumOfLikes(article.votes);
        return fetchUserByUsername(article.author);
      })
      .catch((err) => {
        setError(err.response);
      })
      .then((user) => {
        setAuthor(user);
      });
  }, [articleId]);

  //article like feature
  const handleClick = () => {
    const vote = liked ? -1 : 1;
    setNumOfLikes((currentLikes) => currentLikes + vote);
    setLiked((currentStatus) => !currentStatus);
    //patch article
    patchArticleVotes(articleId, vote).catch(() => {
      setNumOfLikes((currentLikes) => currentLikes - vote);
      setLiked((currentStatus) => !currentStatus);
    });
  };

  return (
    <>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <ArticlesNav />
          {isLoading ? (
            <div uk-spinner="ratio: 3" className="uk-position-center"></div>
          ) : (
            <>
              <main className="uk-container uk-container-small uk-margin-large-top">
                <article className="uk-article">
                  <div className="uk-text-meta uk-text-uppercase primary-colour-text">
                    {article.topic}
                  </div>
                  <h2 className="uk-article-title uk-margin-small-top">
                    {article.title}
                  </h2>
                  <dl className="uk-article-meta">
                    <dt className="uk-margin-small-top uk-text-normal">
                      <img
                        src={author.avatar_url}
                        alt={author.username}
                        className="uk-border-circle uk-margin-small-right avatar"
                      />
                      Written by {article.author}
                    </dt>
                    <dt className="uk-text-meta uk-margin-small-top uk-text-normal">
                      {formattedDate}
                    </dt>
                  </dl>
                  <p className="uk-text-justify medium-text uk-dropcap">
                    {article.body}
                  </p>
                </article>
                <div className="uk-margin-top">
                  <button
                    className={
                      liked
                        ? "active-button uk-icon-button primary-colour-text uk-margin-small-right"
                        : "uk-icon-button primary-colour-text uk-margin-small-right"
                    }
                    uk-icon="heart"
                    uk-tooltip={liked ? "Unlike" : "Like"}
                    onClick={handleClick}
                  ></button>
                  <span className="uk-text-meta uk-text-normal uk-margin-top uk-text-middle">
                    {numOfLikes}
                  </span>
                </div>
                <hr className="uk-divider-small uk-margin-medium-top" />
                <CommentList />
              </main>
            </>
          )}
        </>
      )}
    </>
  );
}

export default SingleArticle;
