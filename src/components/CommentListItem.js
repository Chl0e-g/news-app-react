import { useState, useEffect, useContext } from "react";
import { formatDate } from "../utils/formatDate";
import { fetchUserByUsername } from "../api/users";
import { UserContext } from "../context/UserContext";
import { deleteComment } from "../api/comments";

function CommentListItem({ comment, setComments }) {
  const formattedDate = formatDate(comment.created_at);
  const [commentAuthor, setCommentAuthor] = useState({});
  const { loggedInUser } = useContext(UserContext);

  //fetch comment authors for avatars
  useEffect(() => {
    fetchUserByUsername(comment.author).then((user) => {
      setCommentAuthor(user);
    });
  }, [comment.author]);

  //handle delete comment
  const handleClick = () => {
    //optimistic rendering
    let indexOfDeletedComment;
    setComments((currentComments) => {
      const filteredComments = [...currentComments].filter(
        (currentComment, i) => {
          if (currentComment.comment_id !== comment.comment_id)
            return currentComment;
          else {
            indexOfDeletedComment = i;
            return null;
          }
        }
      );
      return filteredComments;
    });
    //api call
    deleteComment(comment.comment_id).catch(() => {
      //adding comment back if api call unsuccessful
      setComments((currentComments) => {
        const newComments = [...currentComments];
        newComments.splice(indexOfDeletedComment, 0, comment);
        return newComments;
      });
    });
  };

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
        {loggedInUser.username === commentAuthor.username ? (
          <div className="uk-flex-1">
            <button
              className={
                "uk-icon-button primary-colour-text delete-button uk-align-right uk-margin-right"
              }
              uk-icon="trash"
              uk-tooltip="Delete comment"
              onClick={handleClick}
            ></button>
          </div>
        ) : null}
      </header>
      <hr />
      <p className="uk-margin-remove">{comment.body}</p>
    </article>
  );
}

export default CommentListItem;
