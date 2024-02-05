import { Link } from "react-router-dom";
const ArticlesCard = ({ article }) => {

    const date = new Date(article.created_at);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
  

    return (
      <li className="article-card">
        <div className="article-content">
        <Link to={`/article/${article.article_id}`} className="single-article-link"><h3 id='article-title'>{article.title}</h3></Link>
          <p><span className='article-card-bold'>Author: </span>{article.author}</p>
          <p><span className='article-card-bold'>Topic:</span> {article.topic}</p>
          <p><span className='article-card-bold'>Topic:</span>{`${day}-${month}-${year}`}</p>
          <p><span className='article-card-bold'>Date created: </span>{article.votes}</p>
          <p><span className='article-card-bold'>Comment count: </span>{article.comment_count}</p>
        </div>
          <img className="article-card-img" src={article.article_img_url} alt={article.title} /> <br/>
          <Link to={`/article/${article.article_id}`} className="single-article-link">Click here to read the full article</Link>
      </li>
    );
  };
  
  export default ArticlesCard;
