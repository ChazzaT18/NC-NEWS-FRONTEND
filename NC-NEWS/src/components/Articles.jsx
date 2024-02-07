import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticlesByTopic, getArticles } from "../api";
import ArticlesCard from "./ArticlesCard";

const Articles = ({ topicsURL }) => {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    const fetchArticles = () => {
      setIsLoading(true);
      return new Promise((resolve, reject) => {
        try {
          if (!selectedTopic) {
            getArticles()
              .then((articles) => {
                setArticlesData(articles);
                resolve();
              })
              .catch((error) => {
                console.error("Error fetching articles:", error);
                reject(error);
              });
          } else {
            getArticlesByTopic(selectedTopic)
              .then((articles) => {
                setArticlesData(articles);
                resolve();
              })
              .catch((error) => {
                console.error("Error fetching articles by topic:", error);
                reject(error);
              });
          }
        } finally {
          setIsLoading(false);
        }
      });
    };

    fetchArticles();
  }, [selectedTopic]);

  if (isLoading) {
    return <div>Loading articles...</div>;
  }

  return (
    <>
      <h2>Articles</h2>
      <div>
        {topicsURL.map((topic) => (
          <Link
            key={topic.slug}
            to={`/${topic.slug}`}
            style={{ marginRight: "10px" }}
          >
            <button>{topic.slug}</button>
          </Link>
        ))}
      </div>
      <ul>
        {articlesData.map((article) => (
          <ArticlesCard key={article.title} article={article} />
        ))}
      </ul>
    </>
  );
};

export default Articles;
