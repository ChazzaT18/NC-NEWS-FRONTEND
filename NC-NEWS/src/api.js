import axios from "axios";

export const getArticles = () => {
  return axios
    .get("https://chazzat18-nc-news.onrender.com/api/articles")
    .then((response) => {
      return response.data.articles;
    });
};

export default getArticles;
