import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import { getArticlesByTopic } from "../api"; 
import ArticlesCard from "./ArticlesCard";

const TopicsArticles = ({ topic, topicsURL }) => {
  const { slug } = topic;
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    getArticlesByTopic(slug)
      .then((articles) => {
        setArticlesData(articles);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [articlesData]);

  if (isLoading) {
    return <div>Loading articles...</div>;
  }

  return (
    <>
      <h2>Articles for {slug}</h2>
      <div>
      <Link
            key='allArticles'
            to='/'
            style={{ marginRight: "10px" }}
          ><button>All Articles</button></Link>
        {topicsURL.map((topic) => (
          <Link key={topic.slug} to={`/${topic.slug}`} style={{ marginRight: "10px" }}>
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

export default TopicsArticles;