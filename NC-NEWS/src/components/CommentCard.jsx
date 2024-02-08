const CommentCard = ({ comment }) => {

  const date = new Date(comment.created_at);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return (
    <div className="comment-card">
      <h3>By: {comment.author}</h3><br/>
      <p>{comment.body}</p><br/>
      <p>Votes: {comment.votes}</p><br/>
      <p>Created at: {`${day}-${month}-${year}`}</p>
    </div>
  );
};

export default CommentCard;