const ArticlesCard = ({ article }) => {
    return (
      <li className="article-card">
        <div>
          <h3 id='article-title'>{article.title}</h3>
          <p>Author: {article.author}</p>
          <p>Topic: {article.topic}</p>
          <p>Created at: {article.created_at}</p>
          <p>Votes: {article.votes}</p>
          <p>Comment count: {article.comment_count}</p>
          <img className="article-card-img" src={article.article_img_url} alt={article.title} />
        </div>
      </li>
    );
  };
  
  export default ArticlesCard;
