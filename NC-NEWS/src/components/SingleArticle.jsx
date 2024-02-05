import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../api";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [articleIsLoading, setArticleIsLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [commentsIsLoading, setCommentsIsLoading] = useState(true);
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);

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
  }, [article_id]);

  if (articleIsLoading) {
    return <div>Loading article...</div>;
  }
  if (commentsIsLoading) {
    return <div>Loading article...</div>;
  }

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const date = new Date(article.created_at);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return (
    <div className="single-article-card">
      <h2 id="single-article-title">{article.title}</h2>
      <div className="single-article-information">
        <p><span className="article-card-bold">Author: </span>{article.author}</p>
        <p><span className="article-card-bold">Topic: </span>{article.topic}</p>
        <p><span className="article-card-bold">Created at: </span>{`${day}-${month}-${year}`}</p>
        <p><span className="article-card-bold">Votes: </span>{article.votes}</p>
        <p><span className="article-card-bold">Comment count: </span>{article.comment_count}</p>
      </div>
      <img
        className="article-card-img"
        alt={article.title}
        src={article.article_img_url}
      />
      <p className="single-article-body">{article.body}</p> <br />
      <button onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && (
        <div className="comments">
          {comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleArticle;
