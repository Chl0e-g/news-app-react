import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

function ArticleListItem({ article }) {
  const date = article.created_at;
  const formattedDate = formatDate(date);
  return (
    <Link to={`/articles/${article.article_id}`} className="uk-text-decoration-none">
      <div className="uk-card uk-card-default uk-card-hover uk-margin uk-width-medium uk-width-large@s uk-width-xlarge@m ukwidth2xlarge@l">
        <div className="uk-card-body">
          <div className="uk-text-meta uk-text-uppercase">{article.topic}</div>
          <h2 className="uk-card-title uk-margin-small-top uk-margin-remove-bottom">
            {article.title}
          </h2>
          <div className="uk-text-meta uk-margin-small-top">
            By {article.author}
          </div>
          <div className="uk-text-meta uk-margin-small-top">
            {formattedDate}
          </div>
          <div className="uk-flex">
            <div className="uk-text-meta uk-margin-small-top uk-margin-medium-right">
              <span uk-icon="comments"></span> {article.comment_count}
            </div>
            <div className="uk-text-meta uk-margin-small-top">
              <span uk-icon="heart"></span> {article.votes}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleListItem;
