import { fetchArticle } from "../api/articles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { fetchUserByUsername } from "../api/users";
import ArticlesNav from "./ArticlesNav";

function SingleArticle() {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const { articleId } = useParams();
  const formattedDate = formatDate(article.created_at);

  useEffect(() => {
    setIsLoading(true);
    fetchArticle(articleId)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
        return fetchUserByUsername(article.author);
      })
      .then((user) => {
        setAuthor(user);
      });
  }, [articleId]);

  return (
    <>
      <ArticlesNav />
      {isLoading ? (
        <div uk-spinner="ratio: 3" className="uk-position-center"></div>
      ) : (
        <main className="uk-container uk-container-small uk-margin-top">
          <article className="uk-article ">
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
                  className="uk-border-circle avatar"
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
        </main>
      )}
    </>
  );
}

export default SingleArticle;
