import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { getArticles } from "../api";
import ErrorComponent from "./ErrorComponent";
import ArticlesCard from "./ArticlesCard";

const Articles = ({ topicsURL }) => {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [sort_by, setSortBy] = useState(searchParams.get("sort_by") || "DESC");
  const [order_by, setOrderBy] = useState(
    searchParams.get("order_by") || "created_at"
  );
  const [topic, setTopic] = useState(searchParams.get("topic") || "");
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getArticles(sort_by, order_by, topic)
      .then((articles) => {
        setArticlesData(articles);
      })
      .catch((err) => {
        setError(err.response.data.msg || 'An error occurred');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sort_by, order_by, topic]);
  
  const handleQueries = (event) => {
    const { name, value } = event.target;

    if (name === "sort_by") {
      setSortBy(value);
    } else if (name === "order_by") {
      setOrderBy(value);
    } else if (name === "topic") {
      setTopic(value);
    }
    setParams({
      ...params,
      sort_by: name === "sort_by" ? value : sort_by,
      order_by: name === "order_by" ? value : order_by,
      topic: name === "topic" ? value : topic,
    });
  };
  const handleAllArticles = () => {
    const updatedParams = { ...params };
    updatedParams.delete("topic");
    setParams(updatedParams);
    setTopic("");
  };

  if (isLoading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <>
      <h2>Articles</h2>
      <div>
        <label>Topics: <select name="topic" value={topic} onChange={handleQueries}>
          <option value="" onChange={handleAllArticles}>
            All
          </option>
          {topicsURL.map((topic) => (
            <option
              key={topic.slug}
              value={topic.slug}
              onChange={handleQueries}
            >
              {topic.slug}
            </option>
          ))}
        </select>
        </label>
      </div>
      <div>
        <label>
          {" "}
          Sort By:
          <select name="sort_by" value={sort_by} onChange={handleQueries}>
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
          Order by:
          <select name="order_by" value={order_by} onChange={handleQueries}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
        </label>
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