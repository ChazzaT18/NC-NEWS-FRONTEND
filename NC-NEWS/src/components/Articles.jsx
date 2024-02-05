import getArticles from "../api";
import ArticlesCard from "./ArticlesCard";
import { useEffect, useState } from "react";

const Articles = () => {
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    getArticles().then((articles) => {
      setArticlesData(articles);
    });
  }, []);

  return (
    <>
      <h2>All Article's</h2>
      <ul>
        {articlesData.map((article) => {
          return <ArticlesCard key={article.title} article={article} />;
        })}
      </ul>
    </>
  );
};

export default Articles;
