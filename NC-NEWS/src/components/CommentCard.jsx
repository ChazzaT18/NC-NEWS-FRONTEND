import { useState, useContext } from "react";
import UserContext from "../contexts/UserContexts";
import { deleteCommentById } from "../api";

const CommentCard = ({ comment_count, comment, updateCommentCount }) => {
  const loggedInUser = useContext(UserContext);
  const currentUser = loggedInUser.loggedInUser;
  const [error, setError] = useState(null);

  const date = new Date(comment.created_at);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const handleCommentDelete = () => {
    deleteCommentById(comment.comment_id)
      .then(() => {
        window.alert("Comment has been deleted!");
        updateCommentCount(comment_count - 1);
      })
      .catch((err) => {
        setError(err.response.data.msg || 'An error occurred');
      });
  };

  return (
    <>
      <div className="comment-card">
        <h3>By: {comment.author}</h3><br/>
        <p>{comment.body}</p><br/>
        <p>Votes: {comment.votes}</p><br/>
        <p>Created at: {`${day}-${month}-${year}`}</p>
        {currentUser && currentUser.username === comment.author ? 
          <button onClick={handleCommentDelete}>Delete Comment</button> : 
          null
        }
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default CommentCard;