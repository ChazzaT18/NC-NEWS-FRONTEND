import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
      });
  }, [article_id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-article-card">
      <h2 id="single-article-title">{article.title}</h2>
      <div className="single-article-information">
        <p>Author: {article.author}</p>
        <p>Topic: {article.topic}</p>
        <p>Created at: {article.created_at}</p>
        <p>Votes: {article.votes}</p>
        <p>Comment count: {article.comment_count}</p>
      </div>
      <img
        className="article-card-img"
        alt={article.title}
        src={article.article_img_url}
      />
      <p className="single-article-body">{article.body}</p>
    </div>
  );
};

export default SingleArticle;
