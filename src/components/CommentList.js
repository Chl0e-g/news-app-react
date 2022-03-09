import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchComments } from "../api/comments";
import CommentListItem from "./CommentListItem";

function CommentList() {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //fetch comments
  useEffect(() => {
    setIsLoading(true);
    fetchComments(articleId).then((commentData) => {
      setComments(commentData);
      setIsLoading(false);
    });
  }, [articleId]);

  return (
    <div className="uk-margin-bottom">
      <h3>Comments</h3>
      {isLoading ? (
        <div uk-spinner="true"></div>
      ) : (
        <>
          {comments.map((comment) => {
            return (
              <CommentListItem comment={comment} key={comment.comment_id} />
            );
          })}
        </>
      )}
    </div>
  );
}

export default CommentList;
