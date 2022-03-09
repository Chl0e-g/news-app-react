import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchComments } from "../api/comments";
import CommentForm from "./CommentForm";
import CommentListItem from "./CommentListItem";

function CommentList() {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentPosted, setCommentPosted] = useState(0);

  //fetch comments
  useEffect(() => {
    setIsLoading(true);
    fetchComments(articleId).then((commentData) => {
      const sortedComments = commentData.sort((a, b) => {
          return new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()});
      setComments(sortedComments);
      setIsLoading(false);
    });
  }, [articleId, commentPosted]);

  return (
    <div className="uk-margin-bottom">
      <h3>Comments</h3>
      {isLoading ? (
        <div uk-spinner="true"></div>
      ) : (
        <>
          <CommentForm articleId={articleId} setCommentPosted={setCommentPosted} isLoading={isLoading}/>
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
