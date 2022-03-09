import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { postComment } from "../api/comments";

function CommentForm({ articleId, setCommentPosted}) {
  const [commentText, setCommentText] = useState("");
  const [commentPosting, setCommentPosting] = useState(false)
  const { loggedInUser } = useContext(UserContext);

  //handle typing in form
  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentPosting(true)
    const commentData = { username: loggedInUser.username, body: commentText };
    //api call
    postComment(articleId, commentData).then(()=>{
        setCommentPosted((curr) => curr + 1)
        setCommentPosting(false)
    }).catch(() => {
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
        <button className="uk-button primary-colour-background">{commentPosting ? (<div uk-spinner="ratio: 0.7"></div>) : (<span>Submit</span>)}</button>
      </fieldset>
    </form>
  );
}

export default CommentForm;
