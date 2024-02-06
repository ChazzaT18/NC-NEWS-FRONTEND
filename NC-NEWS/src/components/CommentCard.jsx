import UserContext from "../contexts/UserContexts";
import { useState, useContext } from "react";
import { deleteCommentById } from "../api";

const CommentCard = ({ comment_count, comment, updateCommentCount }) => {

  const loggedInUser = useContext(UserContext);
  const currentUser = loggedInUser.loggedInUser;


  const date = new Date(comment.created_at);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const handleCommentDelete = () => {
    deleteCommentById(comment.comment_id);
    window.alert("Comment has been deleted!");
    updateCommentCount(comment_count - 1)    
  };


  return (
    <>
    <div className="comment-card">
      <h3>By: {comment.author}</h3><br/>
      <p>{comment.body}</p><br/>
      <p>Votes: {comment.votes}</p><br/>
      <p>Created at: {`${day}-${month}-${year}`}</p>
      {currentUser && currentUser.username === comment.author? <button onClick={handleCommentDelete}>Delete Comment</button> : null}
    </div>
    </>
  );
};

export default CommentCard;