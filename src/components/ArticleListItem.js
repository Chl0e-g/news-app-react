import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

function ArticleListItem({ article }) {
  const formattedDate = formatDate(article.created_at);
  return (
    <Link to={`/articles/${article.article_id}`} className="uk-text-decoration-none">
      <div className="uk-card uk-card-default uk-card-hover uk-margin uk-width-medium uk-width-xlarge@s uk-width-2xlarge@m ukwidth-3xlarge@l">
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
