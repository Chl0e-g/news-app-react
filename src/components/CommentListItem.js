import { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate";
import { fetchUserByUsername } from "../api/users";

function CommentListItem({ comment }) {
  const formattedDate = formatDate(comment.created_at);
  const [commentAuthor, setCommentAuthor] = useState({});

  //fetch comment authors for avatars
  useEffect(() => {
    fetchUserByUsername(comment.author).then((user) => {
      setCommentAuthor(user);
    });
  }, [comment.author]);

  return (
      <article className="uk-comment uk-comment-primary uk-margin">
        <header className="uk-flex uk-flex-middle">
          <img
            src={commentAuthor.avatar_url}
            alt={comment.author}
            className="uk-margin-right uk-margin-bottom uk-border-circle avatar"
          />
          <div>
            <h4 className="uk-text-light">{comment.author}</h4>
            <dl>
              <dt className="uk-text-meta uk-text-normal reduce-line-height">
                {formattedDate}
              </dt>
            </dl>
          </div>
        </header>
        <hr />
        <p className="uk-margin-remove">{comment.body}</p>
      </article>
  );
}

export default CommentListItem;
