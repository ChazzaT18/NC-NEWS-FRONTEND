import { useState, useContext } from "react";
import UserContext from "../contexts/UserContexts";
import CommentCard from "./CommentCard";
import { postCommentByArticleId } from "../api";

const CommentsList = ({
  comments,
  article_id,
  updateCommentCount,
  comment_count,
}) => {
  const loggedInUser = useContext(UserContext);
  const currentUser = loggedInUser.loggedInUser;
  const [itemSubmitted, setItemSubmitted] = useState(false);
  const [newComment, setNewComment] = useState("");

  function showAlert() {
    window.alert("You must be logged in to comment!");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setItemSubmitted(true);
    postCommentByArticleId(
      newComment,
      loggedInUser.loggedInUser.username,
      article_id
    );
    updateCommentCount(comment_count + 1);
  };

  return (
    <div className="comments">
      <h2 id="comment-header">Comments</h2>
      {itemSubmitted && <p>Your comment has been submitted!</p>}
      <form onSubmit={currentUser === undefined ? showAlert : handleSubmit}>
        <label>Add a comment:</label>
        <input
          required
          type="text"
          name="comment"
          id="new-comment"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment_count={comment_count} comment={comment} updateCommentCount={updateCommentCount}/>
      ))}
    </div>
  );
};

export default CommentsList;