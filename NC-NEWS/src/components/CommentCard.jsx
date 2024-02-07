const CommentCard = ({comment}) => {
    const date = new Date(comment.created_at);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;
  
    return (
      <div className="comment-card">
        <h3>{comment.author}</h3>
        <p>{comment.body}</p>
        <p>Created at: {formattedDate}</p>
        <p>Votes: {comment.votes}</p>
      </div>
    );
}

export default CommentCard