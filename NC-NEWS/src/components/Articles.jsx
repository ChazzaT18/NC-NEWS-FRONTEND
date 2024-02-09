import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { getArticles } from "../api";
import ArticlesCard from "./ArticlesCard";

const Articles = ({ topicsURL }) => {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    getArticles(sort_by, order_by, topic)
      .then((articles) => {
        setArticlesData(articles);
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

  return (
    <>
      <h2>Articles</h2>
      <div>
        <select name="topic" value={topic} onChange={handleQueries}>
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
