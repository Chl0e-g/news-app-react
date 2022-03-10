import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { postComment } from "../api/comments";

function CommentForm({ articleId, setCommentPosted }) {
  //submit button text
  const normalButtonText = <span>Submit</span>;
  const loadingButtonText = <div uk-spinner="ratio: 0.7"></div>;
  const successButtonText = <span uk-icon="check"></span>;
  const failureButtonText = <span uk-icon="warning">Try again</span>;

  //state and context
  const [commentText, setCommentText] = useState("");
  const [buttonText, setButtonText] = useState(normalButtonText);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  //submit button enabled/disabled styling
  const enabledButton = (
    <button className="uk-button uk-display-block primary-colour-background">
      {buttonText}
    </button>
  );
  const disabledButton = (
    <button className="uk-button uk-display-block" disabled uk-tooltip="Type comment to submit">
      {buttonText}
    </button>
  );

  //handle typing in form
  const handleChange = (e) => {
    setCommentText(e.target.value);
    if (e.target.value.length > 0) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText(loadingButtonText);
    const commentData = { username: loggedInUser.username, body: commentText };
    //api call
    postComment(articleId, commentData)
      .then(() => {
        setCommentPosted((curr) => curr + 1); //triggers comments fetch in CommentList
        setButtonText(successButtonText);
        setCommentText("");
        setTimeout(() => {
          setButtonText(normalButtonText);
          setButtonEnabled(false);
        }, 1000);
      })
      .catch(() => {
        setButtonText(failureButtonText);
        setTimeout(() => {
          setButtonText(normalButtonText);
        }, 3000);
      });
  };

  return (
    <form className="uk-margin-medium" onSubmit={handleSubmit}>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend medium-text">Add a comment</legend>
        <textarea
          className="uk-textarea uk-margin-small"
          rows="4"
          placeholder="Write your comment..."
          value={commentText}
          onChange={handleChange}
        ></textarea>
        {buttonEnabled ? enabledButton : disabledButton}
      </fieldset>
    </form>
  );
}

export default CommentForm;
