import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId, patchVotes } from "../api";
import CommentsList from "./CommentsList";

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
  }, [comments, article_id]);

  if (articleIsLoading || commentsIsLoading) {
    return <div>Loading...</div>;
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

  const updateCommentCount = (newCount) => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      comment_count: newCount,
    }));
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="single-article-card">
      <h2 id="single-article-title">{article.title}</h2>
      <p className="single-article-body">{article.body}</p>
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
          {new Date(article.created_at).toLocaleString()}
        </p>
        <p>
          <span className="article-card-bold">Votes: </span>
          {article.votes}
        </p>
        <p>
          <span className="article-card-bold">Comment count: </span>
          {article.comment_count}
        </p>
      </div>
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
        <CommentsList
          comments={comments}
          article_id={article_id}
          updateCommentCount={updateCommentCount}
          comment_count={article.comment_count}
        />
      )}
    </div>
  );
};

export default SingleArticle;
