import { getArticles } from "../api";
import ArticlesCard from "./ArticlesCard";
import { useEffect, useState } from "react";

const Articles = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then((articles) => {
        console.log(articles);
        setArticlesData(articles);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading articles...</div>;
  }

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
