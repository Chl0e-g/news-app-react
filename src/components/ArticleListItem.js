import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

function ArticleListItem({ article }) {
  const formattedDate = formatDate(article.created_at);
  return (
    <Link
      to={`/articles/${article.article_id}`}
      className="uk-text-decoration-none"
    >
      <div className="uk-card uk-card-default uk-card-hover uk-margin uk-width-medium uk-width-xlarge@s uk-width-2xlarge@m ukwidth-3xlarge@l">
        <div className="uk-card-body">
          <div className="uk-text-meta uk-text-uppercase primary-colour-text">
            {article.topic}
          </div>
          <h2 className="uk-card-title uk-margin-small-top uk-margin-remove-bottom">
            {article.title}
          </h2>
          <dl>
            <dt className="uk-text-meta uk-margin-small-top uk-text-normal">
              By {article.author}
            </dt>
            <dt className="uk-text-meta uk-margin-small-top uk-text-normal">
              {formattedDate}
            </dt>
            <div className="uk-flex">
              <dt className="uk-text-meta uk-margin-small-top uk-margin-medium-right uk-text-normal">
                <span uk-icon="comments"></span> {article.comment_count}
              </dt>
              <dt className="uk-text-meta uk-margin-small-top uk-text-normal">
                <span uk-icon="heart"></span> {article.votes}
              </dt>
            </div>
          </dl>
        </div>
      </div>
    </Link>
  );
}

export default ArticleListItem;
