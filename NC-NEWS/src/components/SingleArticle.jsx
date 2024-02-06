import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId, patchVotes } from "../api";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [articleIsLoading, setArticleIsLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [commentsIsLoading, setCommentsIsLoading] = useState(true);
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [upvoteClicked, setUpvoteClicked] = useState(false);
  const [downvoteClicked, setDownvoteClicked] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
      })
      .finally(() => {
        setArticleIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
      })
      .finally(() => {
        setCommentsIsLoading(false);
      });
  }, []);

  if (articleIsLoading) {
    return <div>Loading article...</div>;
  }
  if (commentsIsLoading) {
    return <div>Loading article...</div>;
  }

  const handleVote = (newVote) => {
    const updatedVotes = article.votes + newVote;
    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: updatedVotes,
    }));
    patchVotes(newVote, article_id)
      .then((updatedArticle) => {
        updatedArticle.comment_count = article.comment_count;
        setArticle(updatedArticle);
      })
      .catch((error) => {
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: prevArticle.votes - newVote,
        }));
        throw error;
      });
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const date = new Date(article.created_at);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return (
    <div className="single-article-card">
      {article && (
        <>
          <h2 id="single-article-title">{article.title}</h2>
          <p className="single-article-body">{article.body}</p>
          <br />
          <img
            className="article-card-img"
            alt={article.title}
            src={article.article_img_url}
          />
          <div className="single-article-information">
            <p>
              <span className="article-card-bold">Author: </span>
              {article.author}
            </p>
            <p>
              <span className="article-card-bold">Topic: </span>
              {article.topic}
            </p>
            <p>
              <span className="article-card-bold">Created at: </span>
              {`${day}-${month}-${year}`}
            </p>
            <p>
              <span className="article-card-bold">Votes: </span>
              {article.votes}
            </p>
            <p>
              <span className="article-card-bold">Comment count: </span>
              {article.comment_count}
            </p>
            <br />
          </div>
        </>
      )}
      <div className="vote-buttons">
        <button
          onClick={() => {
            handleVote(1);
            setUpvoteClicked(true);
            setDownvoteClicked(false);
          }}
          id="upvote-button"
          style={{
            backgroundColor: upvoteClicked ? "#228703" : "",
            color: upvoteClicked ? "white" : "black",
            borderColor: upvoteClicked ? "white" : "#d7fadd",
          }}
        >
          Upvote
        </button>

        <button
          onClick={() => {
            handleVote(-1);
            setDownvoteClicked(true);
            setUpvoteClicked(false);
          }}
          id="downvote-button"
          style={{
            backgroundColor: downvoteClicked ? "#910303" : "",
            fontWeight: downvoteClicked ? "bold" : "normal",
            color: downvoteClicked ? "white" : "black",
            borderColor: downvoteClicked ? "white" : "#ffc9c7",
          }}
        >
          Downvote
        </button>
      </div>
      <button id="comments-button" onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>{" "}
      <br />
      {showComments && (
        <div className="comments">
          <h2 id="comment-header">Comments</h2>
          <form>
            <label>Add a comment:</label>
            <input type="text" name="comment" />
            <button type="submit">Submit</button>
          </form>
          {comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleArticle;
